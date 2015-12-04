import * as ControllerUtility from '../utilities/ControllerUtility';
import * as PlaceService from '../services/PlaceService';
import { sendError, handleSingle } from '../utilities/QueryUtility';

let PlaceController = ControllerUtility.makeController();

PlaceController.get('/', function(req, res) {
  PlaceService.searchPlaces(req.query.latitude, req.query.longitude, req.query.radius)
    .then(places => res.send(places));
});

export default PlaceController;
