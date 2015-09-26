import ControllerUtility from '../utilities/ControllerUtility';
import ImageService from '../services/ImageService';

let ImageController = ControllerUtility.makeController();

ImageController.get('/', function(req, res) {
  ImageService.getImages().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

ImageController.post('/', function(req, res) {
  let image = req.body;
  ImageService.createImage(image).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

ImageController.delete('/:imageId', function(req, res) {
  ImageService.deleteImage(req.params.imageId).then(function() {
    res.sendStatus(204);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

export default ImageController;
