import multer from 'multer';
import * as ControllerUtility from '../utilities/ControllerUtility';
import * as ImageService from '../services/ImageService';
import * as HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError, handleSingle } from '../utilities/QueryUtility';
import fs from 'fs';

let upload = multer({ dest: 'uploads/'});
let ImageController = ControllerUtility.makeController();

ImageController.get('/', function(req, res) {
  ImageService.getImages()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
});

ImageController.post('/base64', upload.single('file'), function(req, res) {
  let file = req.file;
  let image = req.body;
  fs.readFile(file.path, function(err, data) {
    let raw = new Buffer(data.toString(), 'base64');
    fs.writeFile(file.path, raw, function(err) {
      ImageService.createImage(image).then(function(result) {
        ImageService.resizeImage(file.path, result.insertId).then(function() {
          fs.unlink(file.path);
          ImageService.getImage(result.insertId)
            .then(rows => handleSingle(res, rows))
            .catch(err => sendError(res, err));
        }).catch(err => sendError(res, { httpCode: HttpStatusCodes.SERVER_ERROR, message: 'Error resizing image'}));
      }).catch(err => sendError(res, err));
    });
  });
});

ImageController.post('/', upload.single('file'), function(req, res) {
  let file = req.file;
  let image = req.body;
  ImageService.createImage(image).then(function(result) {
    ImageService.resizeImage(file.path, result.insertId).then(function() {
      ImageService.getImage(result.insertId)
        .then(rows => handleSingle(res, rows))
        .catch(err => sendError(res, err));
    }).catch(err => sendError(res, { httpCode: HttpStatusCodes.SERVER_ERROR, message: 'Error resizing image'}));
  }).catch(err => sendError(res, err));
});

ImageController.get('/:imageId', function(req, res) {
  ImageService.getImage(req.params.imageId)
    .then(rows => handleSingle(res, rows, HttpStatusCodes.OK, HttpStatusCodes.NOT_FOUND))
    .catch(err => sendError(res, err));
});

ImageController.delete('/:imageId', function(req, res) {
  ImageService.deleteImage(req.params.imageId)
    .then(() =>res.sendStatus(204))
    .catch(err => sendError(res, err));
});

export default ImageController;
