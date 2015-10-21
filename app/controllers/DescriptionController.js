import ControllerUtility from '../utilities/ControllerUtility';
import DescriptionService from '../services/DescriptionService';

let DescriptionController = ControllerUtility.makeController();

DescriptionController.get('/', function(req, res) {
  DescriptionService.getDescriptions().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

DescriptionController.get('/:descriptionId', function(req, res) {
  DescriptionService.getDescription(req.params.descriptionId).then(function(rows) {
    if (rows.length == 0) res.sendStatus(404);
    else res.send(rows[0]);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

DescriptionController.post('/', function(req, res) {
  let description = req.body;
  DescriptionService.createDescription(description).then(function(result) {
    DescriptionService.getDescription(result.insertId).then(function(rows) {
      if (rows.length == 0) res.status(400).send('An error has occurred');
      else res.send(rows[0]);
    });
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

DescriptionController.delete('/:descriptionId', function(req, res) {
  DescriptionService.deleteDescription(req.params.descriptionId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

DescriptionController.put('/', function(req, res) {
  let description = req.body;
  DescriptionService.updateDescription(description).then(function() {
    DescriptionService.getDescription(description.descriptionId).then(function(rows) {
      if (rows.length == 0) res.status(400).send('An error has occurred');
      else res.send(rows[0]);
    });
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

export default DescriptionController;
