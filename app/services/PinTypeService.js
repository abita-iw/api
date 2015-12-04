import { query } from '../utilities/QueryUtility';

export function getPinTypes() {
    let sql = `
SELECT
    pinTypeId,
    name
FROM
    pinTypes
`;
    return query(sql);
  }
