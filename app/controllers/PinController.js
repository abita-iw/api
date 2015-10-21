import ControllerUtility from '../utilities/ControllerUtility';
import PinService from '../services/PinService';
import FlagService from '../services/FlagService';
import VisitationService from '../services/VisitationService';
import DescriptionService from '../services/DescriptionService';

let PinController = ControllerUtility.makeController();

PinController.get('/', function(req, res) {
  PinService.getPins().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.get('/:pinId', function(req, res) {
  PinService.getPin(req.params.pinId).then(function(rows) {
    if (rows.length != 1) res.status(400).send('An error has occurred');
    else res.send(rows[0]);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.get('/:pinId/descriptions', function(req, res) {
  DescriptionService.getPinDescriptions(req.params.pinId).then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.post('/', function(req, res) {
  let pin = req.body;
  PinService.createPin(pin).then(function(result) {
    PinService.getPin(result.insertId).then(function(rows) {
      if (rows.length == 0) res.status(400).send('An error has occurred');
      else res.send(rows[0]);
    })
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.delete('/:pinId', function(req, res) {
  PinService.deletePin(req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.put('/:pinId/visit', function(req, res) {
  PinService.visitPin(req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.put('/:pinId/flag/:userId', function(req, res) {
  FlagService.createFlag(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.delete('/:pinId/flag/:userId', function(req, res) {
  FlagService.deleteFlag(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.put('/:pinId/visit/:userId', function(req, res) {
  VisitationService.createUserVisitation(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.put('/:pinId/visit', function(req, res) {
  VisitationService.createPinVisitation(req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});




export default PinController;
