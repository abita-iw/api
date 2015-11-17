import express from 'express';
import bodyParser from 'body-parser';
import JWTService from '../services/JWTService';
import AuthService from '../services/AuthService';
import { FORBIDDEN } from '../constants/HttpStatusCodes';

let ControllerUtility = {
  makeController: function() {
    let controller = express();
    controller.use(bodyParser.json());
    return controller;
  },

  authorizeUser: function(req, res, next) {
    let { user } = req;
    if (parseInt(user.userId) === parseInt(req.params.userId))
      next();
    else
      res.status(FORBIDDEN).send({message: 'Not authorized to access this resource'});
  },

  // verify that a valid JWT exists
  authenticateRequest: function(req, res, next) {
    JWTService.verifyToken(req.get('X-JWT'))
     .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.status(FORBIDDEN).send({message: 'Not authorized to access this resource', err: err}));
  }

};

export default ControllerUtility;
