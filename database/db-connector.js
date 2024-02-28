// ./database/db-connector.js
//CITATION: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

var mysql = require("mysql");

// DATABASE info below; can change to a different database later
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_pascuccl",
  password: "wYIfxjXmIUsS",
  database: "cs340_pascuccl",
});

module.exports.pool = pool;
