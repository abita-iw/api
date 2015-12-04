import * as ControllerUtility from '../utilities/ControllerUtility';
import * as TagService from '../services/TagService';
import * as HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError, handleSingle } from '../utilities/QueryUtility';

let TagController = ControllerUtility.makeController();

TagController.get('/', function(req, res) {
  TagService.getTags()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

TagController.get('/:tagId', function(req, res) {
  TagService.getTag(req.params.tagId)
    .then(rows => handleSingle(res, rows, HttpStatusCodes.OK, HttpStatusCodes.NOT_FOUND))
    .catch(err => sendError(res, err));
});

TagController.post('/', function(req, res) {
  let tag = req.body;
  TagService.createTag(tag).then(function(result) {
    TagService.getTag(result.insertId)
      .then(rows => handleSingle(res, rows, HttpStatusCodes.CREATED))
      .catch(err => sendError(res, err));
  }).catch(err => sendError(res, err));
});

export default TagController;
