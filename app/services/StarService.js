import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';

let query = QueryUtility.query;

let StarService = {
  getStars: function () {
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
  },

  getPinStars: function(pinId) {
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
  },

  getUserStars: function(userId) {
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
  },

  createStar: function(userId, pinId) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    stars (userId, pinId, dateCreated)
VALUES
    (?,?,?)
`;
    return query(sql, [userId, pinId, now]);
  },

  deleteStar: function(userId, pinId) {
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
};

export default StarService;
