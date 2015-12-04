import express from 'express';
import bodyParser from 'body-parser';
import * as JWTService from '../services/JWTService';
import * as AuthService from '../services/AuthService';
import { FORBIDDEN } from '../constants/HttpStatusCodes';

export function makeController() {
  let controller = express();
  controller.use(bodyParser.json());
  return controller;
}

export function authorizeUser(req, res, next) {
  let { user } = req;
  if (parseInt(user.userId) === parseInt(req.params.userId))
    next();
  else
    res.status(FORBIDDEN).send({message: 'Not authorized to access this resource'});
}

// verify that a valid JWT exists
export function authenticateRequest(req, res, next) {
  JWTService.verifyToken(req.get('X-JWT'))
   .then(user => {
      req.user = user;
      next();
    })
    .catch(err => res.status(FORBIDDEN).send({message: 'Not authorized to access this resource', err: err}));
}
