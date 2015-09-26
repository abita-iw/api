import ControllerUtility from '../utilities/ControllerUtility';
import PinService from '../services/PinService';

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

PinController.post('/', function(req, res) {
  let pin = req.body;
  PinService.createPin(pin).then(function(result) {
    PinService.getPin(result.insertId).then(function(rows) {
      if (rows.length != 1) res.status(400).send('An error has occurred');
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

export default PinController;
