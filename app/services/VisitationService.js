import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';

let query = QueryUtility.query;

let VisitationService = {

  getPinVisitations: function(pinId) {
    let sql = `
SELECT
    userId,
    pinId,
    dateCreated
FROM
    visitations
WHERE
    pinId = ?
`;
    return query(sql, [pinId]);
  },

  getUserVisitations: function(userId) {
    let sql = `
SELECT
    userId,
    pinId,
    dateCreated
FROM
    visitations
WHERE
    userId = ?
`;
    return query(sql, [userId]);
  },

  createVisitation: function(userId, pinId) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    visitations (userId, pinId, dateCreated)
VALUES
    (?,?,?)
`;
    return query(sql, [userId, pinId, now]);
  }
};

export default VisitationService;
