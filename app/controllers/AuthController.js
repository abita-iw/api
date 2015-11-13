import ControllerUtility from '../utilities/ControllerUtility';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import AuthService from '../services/AuthService';
import { sendError } from '../utilities/QueryUtility';

let AuthController = ControllerUtility.makeController();

AuthController.post('/tokensignin', function(req, res) {
  AuthService.validateToken(req.body.id_token)
    .then(data => res.send(data))
    .catch(err => sendError(res, err));
});

export default AuthController;
