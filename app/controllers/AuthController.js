import * as ControllerUtility from '../utilities/ControllerUtility';
import * as HttpStatusCodes from '../constants/HttpStatusCodes';
import * as AuthService from '../services/AuthService';
import * as UserService from '../services/UserService';
import * as JWTService from '../services/JWTService';
import { sendError } from '../utilities/QueryUtility';

let AuthController = ControllerUtility.makeController();

AuthController.post('/tokensignin', function(req, res) {
  AuthService.validateToken(req.body.id_token)
    .then(token => {
      let { email } = token;
      UserService.getUserByEmail(email).then(rows => {
        if (rows.length === 1) {
          let user = rows[0];
          let jwt = JWTService.createToken(user);
          res.send({
            jwt: jwt,
            data: token,
            user: user
          });
        }
        else sendError(res, 'User does not have an account.');
      });
    })
    .catch(err => sendError(res, err));
});

export default AuthController;
