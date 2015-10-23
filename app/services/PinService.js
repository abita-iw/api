import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';

let query = QueryUtility.query;

let PinService = {
  getPins: function () {
    let sql = `
SELECT
    pinId,
    userId,
    pinTypes.name AS pinType,
    latitude,
    longitude,
    dateCreated,
    dateModified,
    caption
FROM
    pins
JOIN pinTypes
    ON pinTypes.pinTypeId = pins.typeId
WHERE
    isDeleted = false
`;
    return query(sql);
  },

  getPin: function(pinId) {
    let sql = `
SELECT
    pinId,
    userId,
    pinTypes.name AS pinType,
    latitude,
    longitude,
    dateCreated,
    dateModified,
    caption
FROM
    pins
JOIN pinTypes
    ON pinTypes.pinTypeId = pins.typeId
WHERE
    isDeleted = false
    AND pinId = ?
`;
    return query(sql, [pinId]);
  },

  createPin: function(pin) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    pins (
        userId,
        typeId,
        latitude,
        longitude,
        dateCreated,
        dateModified,
        caption
    )
VALUES
    (?,?,?,?,?,?,?)
`;
    return query(sql, [pin.userId, pin.typeId, pin.latitude, pin.longitude, now, now, pin.caption]);
  },

  visitPin: function(pinId) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    pinVisitations (pinId, createdDate)
VALUES
    (?,?)
`;
    return query(sql, [pinId, now]);
  },

  updatePin: function(pin) {
    let now = DateUtility.getNow();
    let sql = `
UPDATE
    pins
SET
    typeId = ?,
    latitude = ?,
    longitude = ?,
    dateModified = ?,
    caption = ?
WHERE
    pinId = ?
`;
    return query(sql, [pin.typeId, pin.latitude, pin.longitude, now, pin.caption, pin.pinId]);
  },

  deletePin: function(pinId) {
    let sql = `
UPDATE
    pins
SET
    isDeleted = true
WHERE
    pinId = ?
`;
    return query(sql, [pinId]);
  }
};

export default PinService;
