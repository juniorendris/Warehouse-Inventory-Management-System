const  mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
  user: 'manager_hs',
  password: 'KiKi(mzHT5]OtbKE',
  database: 'warehouse_db'
}
);
module.exports =  pool;