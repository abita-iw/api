import DateUtility from '../utilities/DateUtility';
import QueryUtility from '../utilities/QueryUtility';

let query = QueryUtility.query;

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
    let sql = `
INSERT INTO
    pinTags (pinId, tagId)
VALUES
    (?,?)
`;
    return query(sql, [pinId, tagId]);
  },

  untagPin: function(pinId, tagId) {
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
