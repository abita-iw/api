import * as ServerConstants from '../constants/ServerConstants';
import { error } from '../utilities/QueryUtility';
import fetch from 'isomorphic-fetch';
import UserService from './UserService';

const VERIFY_ROUTE = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

export function validateToken(token) {
  return fetch(VERIFY_ROUTE + `?id_token=${token}`)
    .then(response => response.json())
};
