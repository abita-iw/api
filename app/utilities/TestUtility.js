import { createToken } from '../services/JWTService';

export function getTestJWT(email) {
  return createToken({email});
}
