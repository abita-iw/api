import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';

let query = QueryUtility.query;

let FlagService = {
  getFlags: function () {
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
  },

  getPinFlags: function(pinId) {
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
  },

  createFlag: function(userId, pinId) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    flags (userId, pinId, dateCreated)
VALUES
    (?,?,?)
`;
    return query(sql, [userId, pinId, now]);
  },

  deleteFlag: function(userId, pinId) {
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
};

export default FlagService;
