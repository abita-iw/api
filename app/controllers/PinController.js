import ControllerUtility from '../utilities/ControllerUtility';
import PinService from '../services/PinService';
import FlagService from '../services/FlagService';
import VisitationService from '../services/VisitationService';
import DescriptionService from '../services/DescriptionService';
import ImageService from '../services/ImageService';
import TagService from '../services/TagService';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError, handleSingle } from '../utilities/QueryUtility';

let PinController = ControllerUtility.makeController();

PinController.get('/', function(req, res) {
  PinService.getPins(req.query.latitude, req.query.longitude, req.query.radius)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

PinController.get('/:pinId', function(req, res) {
  PinService.getPin(req.params.pinId)
    .then(rows => handleSingle(res, rows, HttpStatusCodes.OK, HttpStatusCodes.NOT_FOUND))
    .catch(err => sendError(res, err));
});

PinController.get('/:pinId/descriptions', function(req, res) {
  DescriptionService.getPinDescriptions(req.params.pinId)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

PinController.get('/:pinId/images', function(req, res) {
  ImageService.getPinImages(req.params.pinId)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

PinController.post('/', function(req, res) {
  let pin = req.body;
  PinService.createPin(pin).then(function(result) {
    PinService.getPin(result.insertId)
      .then(rows => handleSingle(res, rows, HttpStatusCodes.CREATED))
      .catch(err => sendError(res, err));
  }).catch(err => sendError(res, err));
});

PinController.put('/', function(req, res) {
  let pin = req.body;
  PinService.updatePin(pin).then(function() {
    PinService.getPin(pin.pinId)
      .then(rows => handleSingle(res, rows))
      .catch(err => sendError(res, err));
  }).catch(err => sendError(res, err));
});

PinController.delete('/:pinId', function(req, res) {
  PinService.deletePin(req.params.pinId)
    .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

PinController.put('/:pinId/flags/:userId', function(req, res) {
  FlagService.createFlag(req.params.userId, req.params.pinId)
    .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

PinController.delete('/:pinId/flags/:userId', function(req, res) {
  FlagService.deleteFlag(req.params.userId, req.params.pinId)
    .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

PinController.get('/:pinId/tags', function(req, res) {
  TagService.getPinTags(req.params.pinId)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

PinController.put('/:pinId/tags/:tagId', function(req, res) {
  TagService.tagPin(req.params.pinId, req.params.tagId)
     .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

PinController.delete('/:pinId/tags/:tagId', function(req, res) {
  TagService.untagPin(req.params.pinId, req.params.tagId)
    .then(() => res.sendStatus(HttpStatusCodes.NO_CONTENT))
    .catch(err => sendError(res, err));
});

PinController.put('/:pinId/visits/:userId', function(req, res) {
  VisitationService.createVisitation(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(HttpStatusCodes.NO_CONTENT);
  }).catch(err => sendError(res, err));
});

PinController.get('/:pinId/visits', function(req, res) {
  VisitationService.getPinVisitations(req.params.pinId)
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

export default PinController;
