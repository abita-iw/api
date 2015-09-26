import QueryUtility from '../utilities/QueryUtility';

let query = QueryUtility.query;

let ImageService = {
  getImages: function () {
    return query("SELECT * FROM images");
  },

  createImage: function(image) {
    let sql = `
INSERT INTO
    images (userId, latitude, longitude, url)
VALUES
    (?,?,?,?)
`;
    return query(sql, [image.userId, image.latitude, image.longitude, image.url]);
  },

  deleteImage: function(id) {
    return query("DELETE FROM images WHERE id = ?", [id]);
  }
};

export default ImageService;
