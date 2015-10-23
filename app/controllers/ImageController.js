import multer from 'multer';
import ControllerUtility from '../utilities/ControllerUtility';
import ImageService from '../services/ImageService';

let upload = multer({ dest: 'uploads/'});
let ImageController = ControllerUtility.makeController();

ImageController.get('/', function(req, res) {
  ImageService.getImages().then(function(rows) {
    res.send(rows);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

ImageController.post('/', upload.single('file'), function(req, res) {
  let file = req.file;
  let image = req.body;
  console.log(file);
  console.log(image);
  ImageService.createImage(image).then(function(result) {
    ImageService.resizeImage(file.path, result.insertId).then(function() {
      ImageService.getImage(result.insertId).then(function(rows) {
        if (rows.length == 0) res.status(404).send('An error has occurred');
        else res.status(201).send(rows[0]);
      }).catch(function(err) {
        res.status(400).send(err);
      });
    }).catch(function(err) {
      res.status(400).send(err);
    });
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

ImageController.get('/:imageId', function(req, res) {
  ImageService.getImage(req.params.imageId).then(function(rows) {
    if(rows.length == 0) res.sendStatus(404);
    else res.send(rows[0]);
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
