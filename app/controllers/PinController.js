import ControllerUtility from '../utilities/ControllerUtility';
import PinService from '../services/PinService';
import FlagService from '../services/FlagService';
import VisitationService from '../services/VisitationService';
import DescriptionService from '../services/DescriptionService';
import ImageService from '../services/ImageService';
import TagService from '../services/TagService';

let PinController = ControllerUtility.makeController();

PinController.get('/', function(req, res) {
  PinService.getPins(req.query.latitude, req.query.longitude, req.query.radius).then(function(rows) {
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

PinController.get('/:pinId/images', function(req, res) {
  ImageService.getPinImages(req.params.pinId).then(function(rows) {
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
      else res.status(201).send(rows[0]);
    }).catch(function(err) {
      res.status(400).send(err);
    });
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.put('/', function(req, res) {
  let pin = req.body;
  PinService.updatePin(pin).then(function() {
    PinService.getPin(pin.pinId).then(function(rows) {
      if (rows.length == 0) res.status(400).send('An error has occurred');
      else res.send(rows[0]);
    }).catch(function(err) {
      res.status(400).send(err);
    });
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

PinController.put('/:pinId/flags/:userId', function(req, res) {
  FlagService.createFlag(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.delete('/:pinId/flags/:userId', function(req, res) {
  FlagService.deleteFlag(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.get('/:pinId/tags', function(req, res) {
  TagService.getPinTags(req.params.pinId).then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.put('/:pinId/tags/:tagId', function(req, res) {
  TagService.tagPin(req.params.pinId, req.params.tagId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.delete('/:pinId/tags/:tagId', function(req, res) {
  TagService.untagPin(req.params.pinId, req.params.tagId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.put('/:pinId/visits/:userId', function(req, res) {
  VisitationService.createVisitation(req.params.userId, req.params.pinId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

PinController.get('/:pinId/visits', function(req, res) {
  VisitationService.getPinVisitations(req.params.pinId).then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

export default PinController;
