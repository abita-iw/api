import { query } from '../utilities/QueryUtility';

export function getImageSizes() {
  return query("SELECT * FROM imageSizes");
};
