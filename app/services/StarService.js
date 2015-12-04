import * as DateUtility from '../utilities/DateUtility';
import { query, error } from '../utilities/QueryUtility';
import models from '../models/index';
import { int } from '../models/types';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';

export function getStars() {
    let sql = `
SELECT
    userId,
    pinId,
    dateCreated
FROM
    stars
WHERE
    isDeleted = false
`;
    return query(sql);
  }

export function getPinStars(pinId) {
    let validationResult = executePropValidator(pinId, 'pinId', int);
    if (!validationResult.isValid) return error(validationResult.error);
    
    let sql = `
SELECT
    userId,
    pinId,
    dateCreated
FROM
    stars
WHERE
    pinId = ?
    AND isDeleted = false
`;
    return query(sql, [pinId]);
  }

export function getUserStars(userId) {
    let validationResult = executePropValidator(userId, 'userId', int);
    if (!validationResult.isValid) return error(validationResult.error);

    let sql = `
SELECT
    userId,
    pinId,
    dateCreated
FROM
    stars
WHERE
    userId = ?
    AND isDeleted = false
`;
    return query(sql, [userId]);
  }

export function createStar(userId, pinId) {
    let userValidationResult = executePropValidator(userId, 'userId', int);
    if (!userValidationResult.isValid) return error(userValidationResult.error);
    let pinValidationResult = executePropValidator(pinId, 'pinId', int);
    if (!pinValidationResult.isValid) return error(pinValidationResult.error);
    
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    stars (userId, pinId, dateCreated)
VALUES
    (?,?,?)
`;
    return query(sql, [userId, pinId, now]);
  }

export function deleteStar(userId, pinId) {
    let userValidationResult = executePropValidator(userId, 'userId', int);
    if (!userValidationResult.isValid) return error(userValidationResult.error);
    let pinValidationResult = executePropValidator(pinId, 'pinId', int);
    if (!pinValidationResult.isValid) return error(pinValidationResult.error);

    let sql = `
UPDATE
    stars
SET
    isDeleted = true
WHERE
    userId = ?
    AND pinId = ?
`;
    return query(sql, [userId, pinId]);
  }
