import ImageMagick from 'imagemagick';
import * as DateUtility from '../utilities/DateUtility';
import { Promise } from 'es6-promise';
import { imageSizes } from '../constants/AppConstants';
import models from '../models/index';
import { int } from '../models/types';
import { validateObject, executePropValidator } from '../utilities/ValidationUtility';
import { query, error } from '../utilities/QueryUtility';

export function getImages() {
  return query("SELECT * FROM images");
}

export function getImage(imageId) {
  let validationResult = executePropValidator(imageId, 'imageId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    imageId,
    userId,
    pinId,
    dateCreated,
    dateModified
FROM
    images
WHERE
    imageId = ?
`;
  return query(sql, [imageId]);
}

export function getPinImages(pinId) {
  let validationResult = executePropValidator(pinId, 'pinId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
SELECT
    imageId,
    userId,
    pinId,
    dateCreated,
    dateModified
FROM
    images
WHERE
    pinId = ?
`;
  return query(sql, [pinId]);
}

export function createImage(image) {
  let validationResult = validateObject(image, models.image);
  if (!validationResult.isValid) return error(validationResult.errors);

  let now = DateUtility.getNow();
  let sql = `
INSERT INTO
    images (userId, pinId, dateCreated, dateModified)
VALUES
    (?,?,?,?)
`;
  return query(sql, [image.userId, image.pinId, now, now]);
}

export function resizeImage(imagePath, imageId) {
  let validationResult = executePropValidator(imageId, 'imageId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let options = imageSizes.map(function(is) {
    return {
      width: is.width,
      srcPath: imagePath,
      dstPath: `public/images/${is.name}/${imageId}.png`
    }
  });
  let promises = options.map(function(option) {
    return new Promise(function(resolve, reject) {
      ImageMagick.resize(option, function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  });
  return Promise.all(promises);
}

export function deleteImage(imageId) {
  let validationResult = executePropValidator(imageId, 'imageId', int);
  if (!validationResult.isValid) return error(validationResult.error);

  let sql = `
UPDATE
    images
SET
    isDeleted = true
WHERE
    imageId = ?
`;
  return query(sql, [imageId]);
}
