import ControllerUtility from '../utilities/ControllerUtility';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import { sendError } from '../utilities/QueryUtility';

let AuthController = ControllerUtility.makeController();

AuthController.post('/tokensignin', function(req, res) {
  AuthService.validateToken(req.body.id_token)
    .then(token => {
      let { data } = token;
      let { email } = data;
      UserService.getUserByEmail(email).then(rows => {
        if (rows.length === 1) {
          token.user = rows[0];
          res.send(token);
        }
        else sendError(res, 'User does not have an account.');
      });
    })
    .catch(err => sendError(res, err));
});

export default AuthController;
