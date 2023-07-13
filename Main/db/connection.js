const mysql = require("mysql2");
const util = require('util');

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees",
  },
  console.log("Connected to the Employee Tracking database.")
);

// This allows us to use the async/await syntax
db.query = util.promisify(db.query);

module.exports = db;