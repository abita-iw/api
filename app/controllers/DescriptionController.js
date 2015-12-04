import * as ControllerUtility from '../utilities/ControllerUtility';
import * as DescriptionService from '../services/DescriptionService';
import * as HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError, handleSingle } from '../utilities/QueryUtility';

let DescriptionController = ControllerUtility.makeController();

DescriptionController.get('/', function(req, res) {
  DescriptionService.getDescriptions()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

DescriptionController.get('/:descriptionId', function(req, res) {
  DescriptionService.getDescription(req.params.descriptionId)
    .then(rows => handleSingle(res, rows, HttpStatusCodes.OK, HttpStatusCodes.NOT_FOUND))
    .catch(err => sendError(res, err));
});

DescriptionController.post('/', function(req, res) {
  let description = req.body;
  DescriptionService.createDescription(description).then(function(result) {
    DescriptionService.getDescription(result.insertId)
      .then(rows => handleSingle(res, rows, HttpStatusCodes.CREATED))
      .catch(err => sendError(res, err));
  }).catch(err => sendError(res, err));
});

DescriptionController.delete('/:descriptionId', function(req, res) {
  DescriptionService.deleteDescription(req.params.descriptionId)
    .then(() => res.sendStatus(204))
    .catch(err => sendError(res, err));
});

DescriptionController.put('/', function(req, res) {
  let description = req.body;
  DescriptionService.updateDescription(description).then(function() {
    DescriptionService.getDescription(description.descriptionId)
      .then(rows => handleSingle(res, rows))
      .catch(err => sendError(res, err));
  }).catch(err => sendError(res, err));
});

export default DescriptionController;
