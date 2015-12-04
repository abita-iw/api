import * as DateUtility from '../utilities/DateUtility';
import { query, error } from '../utilities/QueryUtility';
import models from '../models/index';
import { int } from '../models/types';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';

export function getFlags() {
  let sql = `
SELECT
    userId,
    pinId,
    dateCreated
FROM
    flags
WHERE
    isDeleted = false
`;
  return query(sql);
}

export function getPinFlags(pinId) {
  let validationResult = executePropValidator(pinId, 'pinId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    userId,
    pinId,
    dateCreated
FROM
    flags
WHERE
    pinId = ?
`;
  return query(sql, [pinId]);
}

export function createFlag(userId, pinId) {
  let userValidationResult = executePropValidator(userId, 'userId', int);
  if (!userValidationResult.isValid) return error(userValidationResult.error);
  let pinValidationResult = executePropValidator(pinId, 'pinId', int);
  if (!pinValidationResult.isValid) return error(pinValidationResult.error);

  let now = DateUtility.getNow();
  let sql = `
INSERT INTO
    flags (userId, pinId, dateCreated)
VALUES
    (?,?,?)
`;
  return query(sql, [userId, pinId, now]);
}

export function deleteFlag(userId, pinId) {
  let userValidationResult = executePropValidator(userId, 'userId', int);
  if (!userValidationResult.isValid) return error(userValidationResult.error);
  let pinValidationResult = executePropValidator(pinId, 'pinId', int);
  if (!pinValidationResult.isValid) return error(pinValidationResult.error);

  let sql = `
UPDATE
    flags
SET
    isDeleted = true
WHERE
    userId = ?
    AND pinId = ?
`;
  return query(sql, [userId, pinId]);
}
