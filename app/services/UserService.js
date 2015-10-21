import DateUtility from '../utilities/DateUtility';
import QueryUtility from '../utilities/QueryUtility';

let query = QueryUtility.query;

let UserService = {
  getUsers: function () {
    let sql = `
SELECT
    userId,
    email,
    dateCreated,
    dateModified
FROM
    users
WHERE
    isDeleted = false
`;
    return query(sql);
  },

  getUser: function(userId) {
    let sql = `
SELECT
    userId,
    email,
    dateCreated,
    dateModified
FROM
    users
WHERE
    userId = ?
`;
    return query(sql, [userId]);
  },

  createUser: function(user) {
    let now = DateUtility.getNow();
    let sql = `
INSERT INTO
    users (email, dateCreated, dateModified)
VALUES
    (?,?,?)
`;
    return query(sql, [user.email, now, now]);
  },

  deleteUser: function(userId) {
    return query("UPDATE users SET isDeleted = true WHERE userId = ?", [userId]);
  }
};

export default UserService;
