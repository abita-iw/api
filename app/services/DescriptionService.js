import * as DateUtility from '../utilities/DateUtility';
import { query, error } from '../utilities/QueryUtility';
import models from '../models/index';
import { int } from '../models/types';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';

export function getDescriptions() {
  let sql = `
SELECT
    descriptionId,
    userId,
    pinId,
    text,
    dateCreated,
    dateModified
FROM
    descriptions
WHERE
    isDeleted = false
`;
  return query(sql);
}

export function getDescription(descriptionId) {
  let validationResult = executePropValidator(descriptionId, 'descriptionId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    descriptionId,
    userId,
    pinId,
    text,
    dateCreated,
    dateModified
FROM
    descriptions
WHERE
    descriptionId = ?
`;
  return query(sql, [descriptionId]);
}

export function getUserDescriptions(userId) {
  let validationResult = executePropValidator(userId, 'userId', int);
  if (!validationResult.isValid) return error(validationResult.error);
  
  let sql = `
SELECT
    descriptionId,
    userId,
    pinId,
    text,
    dateCreated,
    dateModified
FROM
    descriptions
WHERE
    userId = ?
`;
  return query(sql, [userId]);
}

export function getPinDescriptions(pinId) {
  let validationResult = executePropValidator(pinId, 'pinid', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    descriptionId,
    userId,
    pinId,
    text,
    dateCreated,
    dateModified
FROM
    descriptions
WHERE
    pinId = ?
`;
  return query(sql, [pinId]);
}

export function createDescription(description) {
  let validationResult = validateObject(description, models.description);
  if (!validationResult.isValid) return error(validationResult.errors);

  let now = DateUtility.getNow();
  let sql = `
INSERT INTO
    descriptions (userId, pinId, text, dateCreated, dateModified)
VALUES
    (?,?,?,?,?)
`;
  return query(sql, [description.userId, description.pinId, description.text, now, now]);
}

export function updateDescription(description) {
  let validationResult = validateObject(description, models.description);
  if (!validationResult.isValid) return error(validationResult.errors);

  let now = DateUtility.getNow();
  let sql = `
UPDATE
    descriptions
SET
    text = ?,
    dateModified = ?
WHERE
    descriptionId = ?
`;
  return query(sql, [description.text, now, description.descriptionId]);
}

export function deleteDescription(descriptionId) {
  let validationResult = executePropValidator(descriptionId, 'descriptionId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
UPDATE
    descriptions
SET
    isDeleted = true
WHERE
    descriptionId = ?
`;
  return query(sql, [descriptionId]);
}
