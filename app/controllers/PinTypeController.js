import ControllerUtility from '../utilities/ControllerUtility';
import PinTypeService from '../services/PinTypeService';

let PinTypeController = ControllerUtility.makeController();

PinTypeController.get('/', function(req, res) {
  PinTypeService.getPinTypes().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

export default PinTypeController;
