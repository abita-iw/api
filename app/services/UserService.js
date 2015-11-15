import DateUtility from '../utilities/DateUtility';
import { query, error } from '../utilities/QueryUtility';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';
import models from '../models/index';
import { int, email } from '../models/types';

let UserService = {
  getUsers: function () {
    let sql = `
SELECT
    userId,
    email,
    dateCreated,
    dateModified
FROM
    users
WHERE
    isDeleted = false
`;
    return query(sql);
  },

  getUserByEmail: function(email) {
    let validationResult = executePropValidator(email, 'email', email);
    if (!validationResult.isValid) return error(validationResult.error);

    let sql = `
SELECT
    userId,
    email,
    dateCreated,
    dateModified
FROM
    users
WHERE
    email = ?
`;
    return query(sql);
  },

  getUser: function(userId) {
    let validationResult = executePropValidator(userId, 'userId', int);
    if (!validationResult.isValid) return error(validationResult.error);

    let sql = `
SELECT
    userId,
    email,
    dateCreated,
    dateModified
FROM
    users
WHERE
    userId = ?
`;
    return query(sql, [userId]);
  },

  createUser: function(user) {
    let validationResult = validateObject(user, models.user);
    if (!validationResult.isValid) return error(validationResult.errors);

    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    users (email, dateCreated, dateModified)
VALUES
    (?,?,?)
`;
    return query(sql, [user.email, now, now]);
  },

  deleteUser: function(userId) {
    let validationResult = executePropValidator(userId, 'userId', int);
    if (!validationResult.isValid) return error(validationResult.error);
    
    return query("UPDATE users SET isDeleted = true WHERE userId = ?", [userId]);
  }
};

export default UserService;
