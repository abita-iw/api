import mysql from 'mysql';
import pool from './ConnectionPool';
import HttpStatusCodes from '../constants/HttpStatusCodes';

let QueryUtility = {
  query: function(sql, inserts) {
    return new Promise(function(resolve, reject) {
      pool.getConnection(function(err, connection) {
        connection.query(mysql.format(sql, inserts), function (err, rows) {
          connection.release();
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
    });
  },

  error: function(message, httpErrorCode = HttpStatusCodes.BAD_REQUEST) {
    return new Promise(function(resolve, reject) {
      reject({
        message: message,
        code: httpErrorCode 
      });
    });
  },

  sendError: function(res, error) {
    if (error.code) 
      res.status(error.code).send(error.message);
    else
      res.status(HttpStatusCodes.SERVER_ERROR).send(error);
  },

  handleSingle: function(res, rows, successCode = HttpStatusCodes.OK, errorCode = HttpStatusCodes.SERVER_ERROR) {
    if (rows.length != 1) {
      QueryUtility.sendError(res, QueryUtility.error('', errorCode));
    }
    else res.status(successCode).send(rows[0]);
  }
};

export default QueryUtility;
