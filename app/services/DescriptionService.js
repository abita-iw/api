import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';

let query = QueryUtility.query;

let DescriptionService = {
  getDescriptions: function () {
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
  },

  getDescription: function(descriptionId) {
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
  },

  getUserDescriptions: function(userId) {
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
  },

  getPinDescriptions: function(pinId) {
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
  },

  createDescription: function(description) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    descriptions (userId, pinId, text, dateCreated, dateModified)
VALUES
    (?,?,?,?,?)
`;
    return query(sql, [description.userId, description.pinId, description.text, now, now]);
  },

  updateDescription: function(description) {
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
  },

  deleteDescription: function(descriptionId) {
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
};

export default DescriptionService;
