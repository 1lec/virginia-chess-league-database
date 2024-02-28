/*
    SETUP
*/

//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
var express = require("express");
var app = express();
PORT = 9753; //this will change in the future apparently

//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
//database
var db = require("./database/db-connector");

/*
    ROUTES
*/
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

app.get("/", function (req, res) {
  // Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
  query1 = "DROP TABLE IF EXISTS diagnostic;";
  query2 =
    "CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);";
  query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working.");';
  query4 = "SELECT * FROM diagnostic;";

  //drop table
  db.pool.query(query1, function (err, results, fields) {
    //create table
    db.pool.query(query2, function (err, results, fields) {
      //insert into table
      db.pool.query(query3, function (err, results, fields) {
        //select * from
        db.pool.query(query4, function (err, results, fields) {
          //send results to browser
          res.send(JSON.stringify(results));
        });
      });
    });
  });
});

/*
    LISTENER
*/
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
