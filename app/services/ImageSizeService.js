import QueryUtility from '../utilities/QueryUtility';

let query = QueryUtility.query;

let ImageSizeService = {
  getImageSizes: function () {
    return query("SELECT * FROM imageSizes");
  }
};

export default ImageSizeService;
