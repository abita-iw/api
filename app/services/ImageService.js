import ImageMagick from 'imagemagick';
import QueryUtility from '../utilities/QueryUtility';
import DateUtility from '../utilities/DateUtility';
import { Promise } from 'es6-promise';

let query = QueryUtility.query;

let ImageService = {
  getImages: function () {
    return query("SELECT * FROM images");
  },

  getImage: function(imageId) {
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
  },

  createImage: function(image) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    images (userId, pinId, dateCreated, dateModified)
VALUES
    (?,?,?,?)
`;
    return query(sql, [image.userId, image.pinId, now, now]);
  },

  resizeImage: function(imagePath, imageId) {
    let imageSizes = [
      {
        "imageSizeId": 1,
        "name": "tiny",
        "height": null,
        "width": 32
      },
      {
        "imageSizeId": 2,
        "name": "small",
        "height": null,
        "width": 240
      },
      {
        "imageSizeId": 3,
        "name": "thumbnail",
        "height": null,
        "width": 100
      },
      {
        "imageSizeId": 4,
        "name": "medium",
        "height": null,
        "width": 500
      },
      {
        "imageSizeId": 5,
        "name": "large",
        "height": null,
        "width": 640
      },
      {
        "imageSizeId": 6,
        "name": "square",
        "height": 60,
        "width": 60
      }
    ];
    let options = imageSizes.map(function(is) {
      return {
        width: is.width,
        srcPath: imagePath,
        dstPath: `public/${is.name}/${imageId}.png`
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
  },

  deleteImage: function(imageId) {
    return query("DELETE FROM images WHERE imageId = ?", [imageId]);
  }
};

export default ImageService;
