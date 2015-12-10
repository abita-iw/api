import mysql from 'mysql';
import pool from './ConnectionPool';
import * as HttpStatusCodes from '../constants/HttpStatusCodes';

export function query(sql, inserts) {
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
}

export function error(message, httpErrorCode = HttpStatusCodes.BAD_REQUEST) {
  return new Promise(function(resolve, reject) {
    reject({
      message: message,
      httpCode: httpErrorCode
    });
  });
}

export function sendError(res, error) {
  if (error.httpCode)
    res.status(error.httpCode).send(error.message);
  else
    res.status(HttpStatusCodes.SERVER_ERROR).send(error);
}

export function handleSingle(res, rows, successCode = HttpStatusCodes.OK, errorCode = HttpStatusCodes.SERVER_ERROR) {
  if (rows.length != 1) {
    QueryUtility.sendError(res, QueryUtility.error('', errorCode));
  }
  else res.status(successCode).send(rows[0]);
}
