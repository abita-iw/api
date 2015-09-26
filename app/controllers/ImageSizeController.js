import ControllerUtility from '../utilities/ControllerUtility';
import ImageSizeService from '../services/ImageSizeService';

let ImageSizeController = ControllerUtility.makeController();

ImageSizeController.get('/', function(req, res) {
  ImageSizeService.getImageSizes().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

export default ImageSizeController;
