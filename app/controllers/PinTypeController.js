import ControllerUtility from '../utilities/ControllerUtility';
import PinTypeService from '../services/PinTypeService';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError } from '../utilities/QueryUtility';

let PinTypeController = ControllerUtility.makeController();

PinTypeController.get('/', function(req, res) {
  PinTypeService.getPinTypes()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

export default PinTypeController;
