import _ from 'lodash';

import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';
import PinUtility from '../utilities/PinUtility';
import { metersPerDegree, defaultPinLimit } from '../constants/ServerConstants';
import { query, error } from '../utilities/QueryUtility';
import models from '../models/index';
import { int } from '../models/types';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';

import ImageService from './ImageService';
import VisitationService from './VisitationService';
import DescriptionService from './DescriptionService';
import FlagService from './FlagService';
import TagService from './TagService';
import LinkService from './LinkService';

  // query pins within a given spherical rectange centered at (latitude,
  // longitude) with side length 2 * radius (in meters)
export function getPins(pinIds) {
  return Promise.all(pinIds.map(pinId => getPin(pinId)));
}

export function searchPins(latitude = null, longitude = null, radius = null, limit = defaultPinLimit) {
  let sql = `
SELECT
    pinId,
    userId,
    pinTypes.name AS pinType,
    latitude,
    longitude,
    dateCreated,
    dateModified,
    title
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
}

export function populatePins(pins) {
  return Promise.all(pins.map(pin => populatePin(pin)));
}

export function populatePin(pin) {
  let pinId = pin.pinId;
  let newPin = Object.assign({}, pin);
  return new Promise(function(resolve, reject) {
    Promise.all([
      ImageService.getPinImages(pinId),
      LinkService.getPinLinks(pinId),
      VisitationService.getPinVisitations(pinId),
      DescriptionService.getPinDescriptions(pinId),
      FlagService.getPinFlags(pinId),
      TagService.getPinTags(pinId)
    ])
    .then(function(rows) {
      newPin.images = rows[0];
      newPin.links = rows[1];
      newPin.visits = rows[2];
      newPin.descriptions = rows[3];
      newPin.flags = rows[4];
      newPin.tags = rows[5];
      resolve(newPin);
    }).catch(err => reject(err));
  }).catch(err => reject(err));
}

export function getPin(pinId) {
  let validationResult = executePropValidator(pinId, 'pinId', int);
  if (!validationResult.isValid) return error(validationResult.error);
  
  let sql = `
SELECT
    pinId,
    userId,
    pinTypes.name AS pinType,
    latitude,
    longitude,
    dateCreated,
    dateModified,
    title
FROM
    pins
JOIN pinTypes
    ON pinTypes.pinTypeId = pins.typeId
WHERE
    isDeleted = false
    AND pinId = ?
`;
  return query(sql, [pinId]);
}

export function createPin(pin) {
  let validationResult = validateObject(pin, models.pin);
  if (!validationResult.isValid) return error(validationResult.errors);
  
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
        title
    )
VALUES
    (?,?,?,?,?,?,?)
`;
  return query(sql, [pin.userId, pin.typeId, pin.latitude, pin.longitude, now, now, pin.title]);
}

export function updatePin(pin) {
  let validationResult = validateObject(pin, models.pin);
  if (!validationResult.isValid) return error(validationResult.errors);
  
  let now = DateUtility.getNow();
  let sql = `
UPDATE
    pins
SET
    typeId = ?,
    latitude = ?,
    longitude = ?,
    dateModified = ?,
    title = ?
WHERE
    pinId = ?
`;
  return query(sql, [pin.typeId, pin.latitude, pin.longitude, now, pin.title, pin.pinId]);
}

export function deletePin(pinId) {
  let validationResult = executePropValidator(pinId, 'pinId', int);
  if (!validationResult.isValid) return error(validationResult.error);
  
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
