import DateUtility from '../utilities/DateUtility';
import { query, error } from '../utilities/QueryUtility';
import models from '../models/index';
import { int } from '../models/types';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';

let TagService = {
  getTags: function () {
    let sql = `
SELECT
    tagId,
    name,
    dateCreated,
    dateModified
FROM
    tags
`;
    return query(sql);
  },

  getPinTags: function(pinId) {
    let validationResult = executePropValidator(pinId, 'pinId', int);
    if (!validationResult.isValid) return error(validationResult.error);

    let sql = `
SELECT
    tags.tagId,
    name,
    dateCreated,
    dateModified
FROM
    tags
JOIN pinTags
    ON pinTags.tagId = tags.tagId
WHERE
    pinTags.pinId = ?
`;
    return query(sql, [pinId]);
  },

  getTag: function(tagId) {
    let validationResult = executePropValidator(tagId, 'tagId', int);
    if (!validationResult.isValid) return error(validationResult.error);

    let sql = `
SELECT
    tagId,
    name,
    dateCreated,
    dateModified
FROM
    tags
WHERE
    tagId = ?
`;
    return query(sql, [tagId]);
  },

  tagPin: function(pinId, tagId) {
    let tagValidationResult = executePropValidator(tagId, 'tagId', int);
    if (!tagValidationResult.isValid) return error(tagValidationResult.error);
    let pinValidationResult = executePropValidator(pinId, 'pinId', int);
    if (!pinValidationResult.isValid) return error(pinValidationResult.error);

    let sql = `
INSERT INTO
    pinTags (pinId, tagId)
VALUES
    (?,?)
`;
    return query(sql, [pinId, tagId]);
  },

  untagPin: function(pinId, tagId) {
    let tagValidationResult = executePropValidator(tagId, 'tagId', int);
    if (!tagValidationResult.isValid) return error(tagValidationResult.error);
    let pinValidationResult = executePropValidator(pinId, 'pinId', int);
    if (!pinValidationResult.isValid) return error(pinValidationResult.error);

    let sql = `
DELETE FROM
    pinTags
WHERE
    pinId = ?
    AND tagId = ?
`;
    return query(sql, [pinId, tagId]);
  },

  createTag: function(tag) {
    let validationResult = validateObject(tag, models.tag);
    if (!validationResult.isValid) return error(validationResult.errors);

    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    tags (name, dateCreated, dateModified)
VALUES
    (?,?,?)
`;
    return query(sql, [tag.name, now, now]);
  }
};

export default TagService;
