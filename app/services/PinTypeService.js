import QueryUtility from '../utilities/QueryUtility';

let query = QueryUtility.query;

let PinTypeService = {
  getPinTypes: function () {
    let sql = `
SELECT
    pinTypeId,
    name
FROM
    pinTypes
`;
    return query(sql);
  }
};

export default PinTypeService;
