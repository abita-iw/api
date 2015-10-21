import DateUtility from '../utilities/DateUtility';
import QueryUtility from '../utilities/QueryUtility';

let query = QueryUtility.query;

let TagService = {
  getTags: function () {
    let sql = `
SELECT
    tagId,
    name,
    dateCreated,
    dateModified
FROM
    tags
`;
    return query(sql);
  },

  getTag: function(tagId) {
    let sql = `
SELECT
    tagId,
    name,
    dateCreated,
    dateModified
FROM
    tags
WHERE
    tagId = ?
`;
    return query(sql, [tagId]);
  },

  createTag: function(tag) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    tags (name, dateCreated, dateModified)
VALUES
    (?,?,?)
`;
    return query(sql, [tag.name, now, now]);
  }
};

export default TagService;
