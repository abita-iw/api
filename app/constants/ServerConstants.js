export default {
  jwt: {
    defaultTokenLifetimeSecs: 60 * 8 * 60,
    algorithm: 'HS256'
  },
  saltSize: 10,
  momentStrings: {
    url: 'YYYY-MM-DD HH:mm:ss'
  },
  metersPerDegree: 111000,
  defaultPinLimit: 50
};
