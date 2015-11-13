import bcrypt from 'bcrypt';
import ServerConstants from '../constants/ServerConstants';
import QueryUtility from '../utilities/QueryUtility';
import { error } from '../utilities/QueryUtility';
import fetch from 'isomorphic-fetch';
import JWTService from './JWTService';

const VERIFY_ROUTE = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

let AuthService = {
  validateToken: function(token) {
    return fetch(VERIFY_ROUTE + `?id_token=${token}`)
      .then(response => response.json())
      .then(payload => {
        return {
          jwt: JWTService.createToken(payload),
          data: payload
        }
      });
  }
};

export default AuthService;
