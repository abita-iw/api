import ControllerUtility from '../utilities/ControllerUtility';
import UserService from '../services/UserService';
import StarService from '../services/StarService';

let UserController = ControllerUtility.makeController();

UserController.post('/', function(req, res) {
  UserService.createUser(req.body).then(function(result) {
    UserService.getUser(result.insertId).then(function(rows) {
      res.send(rows[0]);
    });
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

UserController.get('/', function(req, res) {
  UserService.getUsers().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

UserController.get('/:userId', function(req, res) {
  UserService.getUser(req.params.userId).then(function(rows) {
    if (rows.length != 1) res.send({});
    else res.send(rows[0]);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

UserController.put('/:userId/star/:pinId', function(req, res) {
  StarService.createStar(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

UserController.delete('/:userId/star/:pinId', function(req, res) {
  StarService.deleteStar(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

UserController.delete('/:userId', function(req, res) {
  UserService.deleteUser(req.params.userId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

UserController.get('/:userId/stars', function(req, res) {
  StarService.getUserStars(req.params.userId).then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

export default UserController;
