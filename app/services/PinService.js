import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';
import PinUtility from '../utilities/PinUtility';
import { metersPerDegree, defaultPinLimit } from '../constants/ServerConstants';

let query = QueryUtility.query;

let PinService = {
  // query pins within a given spherical rectange centered at (latitude,
  // longitude) with side length 2 * radius (in meters)
  getPins: function (latitude = null, longitude = null, radius = null, limit = defaultPinLimit) {
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
    isDeleted = false`;
    if (latitude && longitude && radius) {
      let minLat = parseFloat(latitude) - radius / metersPerDegree;
      let maxLat = parseFloat(latitude) + radius / metersPerDegree;
      let minLong = parseFloat(longitude) - radius / metersPerDegree;
      let maxLong = parseFloat(longitude) + radius / metersPerDegree;
      sql += `
    AND latitude between ${minLat} AND ${maxLat}
    AND longitude between ${minLong} AND ${maxLong}
`;
    }
    return new Promise(function(resolve, reject) {
      query(sql).then(function(rows) {
        let sorted = rows.sort(function(a, b) {
          return PinUtility.getDistance(a.latitude, a.longitude, latitude, longitude)
            - PinUtility.getDistance(b.latitude, b.longitude, latitude, longitude);
        });
        resolve(sorted.slice(0, limit));
      }).catch(err => reject(err));
    });
    /*     return query(sql); */
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
