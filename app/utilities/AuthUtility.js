import JWTService from '../services/JWTService';

let AuthUtility = {
  authenticateRequest: function (req, res, next) {
    JWTService.verifyToken(req.get('X-JWT')).then(function () {
      next();
    }).catch(function (err) {
      console.log(err);
      res.status(403).send({message: 'Not authorized to access this resource', err: err});
    });
  }
};

export default AuthUtility;
