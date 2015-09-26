import mysql from 'mysql';
import pool from './ConnectionPool';

let QueryUtility = {
  query: function(sql, inserts) {
    return new Promise(function(resolve, reject) {
      pool.getConnection(function(err, connection) {
        connection.query(mysql.format(sql, inserts), function (err, rows) {
          connection.release();
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(rows);
        });
      });
    });
  }
};

export default QueryUtility;
