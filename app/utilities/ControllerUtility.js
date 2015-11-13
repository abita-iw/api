import express from 'express';
import bodyParser from 'body-parser';
import JWTService from '../services/JWTService';

let ControllerUtility = {
  makeController: function() {
    let controller = express();
    controller.use(bodyParser.json());
    return controller;
  },

  authenticateRequest: function(req, res, next) {
    JWTService.verifyToken(req.get('X-JWT')).then(function() {
      next();
    }).catch(function(err) {
      console.log(err);
      res.status(403).send({message: 'Not authorized to access this resource', err: err});
    });
  }

};

export default ControllerUtility;
