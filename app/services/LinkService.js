import * as DateUtility from '../utilities/DateUtility';
import { query, error } from '../utilities/QueryUtility';
import models from '../models/index';
import { int } from '../models/types';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';

export function getLinks() {
  let sql = `
SELECT
    linkId,
    link,
    pinId,
    dateCreated,
    dateModified
FROM
    links
`;
  return query(sql);
}

export function getPinLinks(pinId) {
  let validationResult = executePropValidator(pinId, 'pinId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    links.linkId,
    links.pinId,
    links.userId,
    link,
    links.dateCreated,
    links.dateModified
FROM
    links
JOIN pins
    ON links.pinId = links.pinId
WHERE
    links.pinId = ?
`;
  return query(sql, [pinId]);
}

export function getLink(linkId) {
  let validationResult = executePropValidator(linkId, 'linkId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    linkId,
    link,
    dateCreated,
    dateModified
FROM
    links
WHERE
    linkId = ?
`;
  return query(sql, [linkId]);
}

export function createLink(link) {
  let validationResult = validateObject(link, models.link);
  if (!validationResult.isValid) return error(validationResult.errors);

  let now = DateUtility.getNow();
  let sql = `
INSERT INTO
    links (pinId, userId, link, dateCreated, dateModified)
VALUES
    (?,?,?,?,?)
`;
  return query(sql, [link.pinId, link.userId, link.link, now, now]);
}

export function deleteLink(linkId) {
  let validationResult = executePropValidator(linkId, 'linkId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
DELETE FROM
    links
WHERE
    linkId = ?
`;
  return query(sql, [linkId]);
}
