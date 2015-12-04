import * as DateUtility from '../utilities/DateUtility';
import { query, error } from '../utilities/QueryUtility';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';
import models from '../models/index';
import { int, email } from '../models/types';

export function getUsers() {
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
}

export function getUserByEmail(userEmail) {
  let validationResult = executePropValidator(userEmail, 'email', email);
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
  return query(sql, [userEmail]);
}

export function getUser(userId) {
  let validationResult = executePropValidator(userId, 'userId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    userId,
    email,
    displayName,
    dateCreated,
    dateModified
FROM
    users
WHERE
    userId = ?
`;
  return query(sql, [userId]);
}

export function createUser(user) {
  let validationResult = validateObject(user, models.user);
  if (!validationResult.isValid) return error(validationResult.errors);

  let now = DateUtility.getNow();
  let sql = `
INSERT INTO
    users (email, displayName, dateCreated, dateModified)
VALUES
    (?,?,?,?)
`;
  return query(sql, [user.email, user.displayName, now, now]);
}

export function deleteUser(userId) {
  let validationResult = executePropValidator(userId, 'userId', int);
  if (!validationResult.isValid) return error(validationResult.error);
  
  return query("UPDATE users SET isDeleted = true WHERE userId = ?", [userId]);
}
