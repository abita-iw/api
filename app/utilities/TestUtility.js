import JWTService from '../services/JWTService';

let TestUtility = {
  getTestJWT: function(email) {
    return JWTService.createToken({email});
  }
}

export default TestUtility;
