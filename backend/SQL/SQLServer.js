const mysql = require("mysql");

const pool = mysql.createPool({
  //just incase the team wants to switch to SQL, delete the file if not needed
  connectionLimit: 10,
  host: "veloxal",
  user: "Veloxal",
  password: "veloxal123",
  database: "SDGP",
});

function SQLConnect() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      console.log("Connected!");
      resolve(connection);
    });
  });
}

module.exports = { SQLConnect };
