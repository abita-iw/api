import ControllerUtility from '../utilities/ControllerUtility';
import TagService from '../services/TagService';

let TagController = ControllerUtility.makeController();

TagController.get('/', function(req, res) {
  TagService.getTags().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

TagController.get('/:tagId', function(req, res) {
  TagService.getTag(req.params.tagId).then(function(rows) {
    if (rows.length != 1) res.status(400).send('An error has occurred');
    else res.send(rows[0]);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

TagController.post('/', function(req, res) {
  let tag = req.body;
  TagService.createTag(tag).then(function(result) {
    TagService.getTag(result.insertId).then(function(rows) {
      if (rows.length != 1) res.status(400).send('An error has occurred');
      else res.send(rows[0]);
    })
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

export default TagController;
