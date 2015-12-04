import jwt from 'jsonwebtoken';
import { Promsise } from 'es6-promise';
import * as ServerConstants from '../constants/ServerConstants';
import fs from 'fs';

var privateKey = fs.readFileSync('./keys/server.key');

export function createToken(payload) {
  return jwt.sign(payload, privateKey, {
    expiresIn: ServerConstants.jwt.defaultTokenLifetimeSecs,
    algorithm: ServerConstants.jwt.algorithm
  });
}

export function verifyToken(token) {
  return new Promise(function(resolve, reject) {
    jwt.verify(token, privateKey, { algorithms: [ServerConstants.jwt.algorithm] }, function(err, decoded) {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}
