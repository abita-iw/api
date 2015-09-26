import bcrypt from 'bcrypt';
import ServerConstants from '../constants/ServerConstants';
import QueryUtility from '../utilities/QueryUtility';

let query = QueryUtility.query;

let AuthService = {
  createUser: function(email, password) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(ServerConstants.saltSize, function(err, salt) {
        if (err) reject(err);
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) reject(err);
          var sql = `
INSERT INTO
    logindata (email, salt, hash)
VALUES
    (?,?,?)
`;
          query(sql, [email, salt, hash]).then(function() {
            resolve();
          }).catch(function(err) {
            reject(err);
          });
        });
      });
    });
  },

  login: function(email, password) {
    return new Promise(function(resolve, reject) {
      var sql = `
SELECT
    id,
    email,
    salt,
    hash
FROM
    logindata
WHERE
    email = ?
`;
      query(sql, [email]).then(function(rows) {
        if (rows.length != 1) reject();
        let user = rows[0];
        bcrypt.hash(password, user.salt, function(err, hash) {
          if (err) reject(err);
          resolve (hash === user.hash);
        });
      }).catch(function() {
        reject();
      });
    });
  }
};

export default AuthService;
