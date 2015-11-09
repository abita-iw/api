import ControllerUtility from '../utilities/ControllerUtility';
import ImageSizeService from '../services/ImageSizeService';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError } from '../utilities/QueryUtility';

let ImageSizeController = ControllerUtility.makeController();

ImageSizeController.get('/', function(req, res) {
  ImageSizeService.getImageSizes()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

export default ImageSizeController;
