import * as ControllerUtility from '../utilities/ControllerUtility';
import * as UserService from '../services/UserService';
import * as StarService from '../services/StarService';
import * as VisitationService from '../services/VisitationService';
import * as DescriptionService from '../services/DescriptionService';
import * as HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError, handleSingle } from '../utilities/QueryUtility';

let UserController = ControllerUtility.makeController();

UserController.post('/', function(req, res) {
  UserService.createUser(req.body).then(function(result) {
    UserService.getUser(result.insertId)
      .then(rows => handleSingle(res, rows, HttpStatusCodes.CREATED));
  }).catch(err => sendError(res, err));
});

UserController.all('*', ControllerUtility.authenticateRequest);
UserController.all('/:userId/*', ControllerUtility.authorizeUser);
UserController.get('/', function(req, res) {
  UserService.getUsers()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

UserController.all('/:userId', ControllerUtility.authorizeUser);
UserController.get('/:userId', function(req, res) {
  UserService.getUser(req.params.userId)
    .then(rows => handleSingle(res, rows, HttpStatusCodes.OK, HttpStatusCodes.NOT_FOUND))
    .catch(err => sendError(res, err));
});

UserController.put('/:userId/stars/:pinId', function(req, res) {
  StarService.createStar(req.params.userId, req.params.pinId)
    .then(() => res.sendStatus(204))
    .catch(err => sendError(res, err));
});

UserController.delete('/:userId/stars/:pinId', function(req, res) {
  StarService.deleteStar(req.params.userId, req.params.pinId)
    .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

UserController.delete('/:userId', function(req, res) {
  UserService.deleteUser(req.params.userId)
    .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

UserController.get('/:userId/stars', function(req, res) {
  StarService.getUserStars(req.params.userId)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

UserController.get('/:userId/descriptions', function(req, res) {
  DescriptionService.getUserDescriptions(req.params.userId)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

UserController.get('/:userId/visits', function(req, res) {
  VisitationService.getUserVisitations(req.params.userId)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

UserController.put('/:userId/visits/:pinId', function(req, res) {
  VisitationService.createVisitation(req.params.userId, req.params.pinId)
    .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

export default UserController;
