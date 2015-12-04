import { query } from '../utilities/QueryUtility';
import * as DateUtility from '../utilities/DateUtility';

export function getPinVisitations(pinId) {
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
  }

export function getUserVisitations(userId) {
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
  }

export function createVisitation(userId, pinId) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    visitations (userId, pinId, dateCreated)
VALUES
    (?,?,?)
`;
    return query(sql, [userId, pinId, now]);
  }
