import * as ControllerUtility from '../utilities/ControllerUtility';
import * as LinkService from '../services/LinkService';
import * as HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError, handleSingle } from '../utilities/QueryUtility';

let LinkController = ControllerUtility.makeController();

LinkController.get('/', function(req, res) {
  LinkService.getLinks()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

LinkController.get('/:linkId', function(req, res) {
  LinkService.getLink(req.params.linkId)
    .then(rows => handleSingle(res, rows, HttpStatusCodes.OK, HttpStatusCodes.NOT_FOUND))
    .catch(err => sendError(res, err));
});

LinkController.post('/', function(req, res) {
  let link = req.body;
  LinkService.createLink(link).then(function(result) {
    LinkService.getLink(result.insertId)
      .then(rows => handleSingle(res, rows, HttpStatusCodes.CREATED))
      .catch(err => sendError(res, err));
  }).catch(err => sendError(res, err));
});

LinkController.delete('/:linkId', function(req, res) {
  LinkService.deleteLink(req.params.linkId)
    .then(() => res.sendStatus(204))
    .catch(err => sendError(res, err));
});

export default LinkController;
