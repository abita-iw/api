import Mysql from 'mysql';
import ConnectionCredentials from '../constants/ConnectionCredentialsTest.js';

var pool = null;

if (pool == null) {
  pool = Mysql.createPool({
    host: ConnectionCredentials.host,
    user: ConnectionCredentials.user,
    password: ConnectionCredentials.password,
    database: ConnectionCredentials.database
  });
}

export default pool;
