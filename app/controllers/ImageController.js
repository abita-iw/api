import multer from 'multer';
import ControllerUtility from '../utilities/ControllerUtility';
import ImageService from '../services/ImageService';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { sendError, handleSingle } from '../utilities/QueryUtility';

let upload = multer({ dest: 'uploads/'});
let ImageController = ControllerUtility.makeController();

ImageController.get('/', function(req, res) {
  ImageService.getImages()
    .then(rows => res.send(rows))
    .catch(err => sendError(res, err));
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
