import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';

let query = QueryUtility.query;

let VisitationService = {

  getPinVisitations: function(pinId) {
    let sql = `
SELECT
    pinVisitationId,
    pinId,
    dateCreated
FROM
    pinVisitations
WHERE
    pinId = ?
`;
    return query(sql, [pinId]);
  },

  getUserPinVisitations: function(userId) {
    let sql = `
SELECT
    userId,
    pinId
FROM
    userVisitations
WHERE
    userId = ?
`;
    return query(sql, [userId]);
  },

  getPinUserVisitations: function(pinId) {
    let sql = `
SELECT
    userId,
    pinId
FROM
    userVisitations
WHERE
    pinId = ?
`;
    return query(sql, [pinId]);
  },

  createUserVisitation: function(userId, pinId) {
    let sql = `
INSERT INTO
    userVisitations (userId, pinId)
VALUES
    (?,?)
`;
    return query(sql, [userId, pinId]);
  },

  createPinVisitation: function(pinId) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    userVisitations (pinId, dateCreated)
VALUES
    (?,?)
`;
    return query(sql, [pinId, now]);
  }
};

export default VisitationService;
