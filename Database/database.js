const mysql = require("mysql");
const dotenv = require('dotenv');
const { timeout } = require("nodemon/lib/config");
dotenv.config();

const db = mysql.createConnection({
  host:process.env.DB_HOST,

  user:process.env.DB_USER,

  password:process.env.DB_PASSWORD,

  database:process.env.DB_DATABASE,
  
  port:process.env.DB_PORT,
  
});


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

db.connect((err) => {
  if (err) throw err;
//   console.log(process.env.DB_DATABASE);
  console.log("MySql Connected");
});
module.exports = db;