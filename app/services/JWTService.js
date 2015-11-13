import jwt from 'jsonwebtoken';
import { Promsise } from 'es6-promise';
import ServerConstants from '../constants/ServerConstants';
import fs from 'fs';

var privateKey = fs.readFileSync('./keys/server.key');

var JWTService = {
  createToken: function(payload) {
    return jwt.sign(payload, privateKey, {
      expiresIn: ServerConstants.jwt.defaultTokenLifetimeSecs,
      algorithm: ServerConstants.jwt.algorithm
    });
  },

  verifyToken: function(token) {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, privateKey, { algorithms: [ServerConstants.jwt.algorithm] }, function(err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  }
};

export default JWTService;
