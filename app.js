/*
    SETUP
*/

//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
var express = require("express");
var app = express();
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 61473; //this will change in the future apparently

//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
//database
var db = require("./database/db-connector");

//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

/*
    ROUTES
*/

//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)

app.get("/", function (req, res) {
  //Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
  res.render("index");
});

app.get("/players", function (req, res) {
  let query1 = "SELECT * FROM Players;";

  db.pool.query(query1, function (error, rows, fields) {
    res.render("players", { data: rows });
  });
  //Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
});

app.get("/seasons", function (req, res) {
  let query1 = "SELECT * FROM Seasons;";

  db.pool.query(query1, function (error, rows, fields) {
    res.render("seasons", { data: rows });
  });
  //Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
});

app.get("/games", function (req, res) {
  let query1 = "SELECT * FROM Games;";

  db.pool.query(query1, function (error, rows, fields) {
    res.render("games", { data: rows });
  });
  //Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
});

app.get("/openings", function (req, res) {
  let query1 = "SELECT * FROM Openings;";

  db.pool.query(query1, function (error, rows, fields) {
    res.render("openings", { data: rows });
  });
  //Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
});

app.get("/results", function (req, res) {
  let query1 = "SELECT * FROM Results;";

  db.pool.query(query1, function (error, rows, fields) {
    res.render("results", { data: rows });
  });
  //Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
});

//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

app.post("/createPlayer-ajax", function (req, res) {
  let data = req.body;
  //capture NULL values; I think it only needs this for numbers?
  let rating = parseInt(data.rating);
  if (isNaN(rating)) {
    rating = "NULL";
  }

  let query1 = `INSERT INTO Players (firstName, lastName, rating, birthday, country) VALUES ('${data.firstName}', '${data.lastName}', ${rating}, '${data.birthday}', '${data.country}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      let query2 = `SELECT * FROM Players;`;
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      });
    }
  });
});

//Citation https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data#create-a-delete-route

app.delete("/delete-player-ajax/", function (req, res, next) {
  let data = req.body;
  let playerID = parseInt(data.id);
  let deletePlayer = `DELETE FROM Players WHERE playerID = ?`;

  // Run the 1st query
  db.pool.query(deletePlayer, [playerID], function (error, rows, fields) {
    {
      // Run the second query
      db.pool.query(deletePlayer, [playerID], function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});

app.put("/update-player-ajax", function (req, res, next) {
  let data = req.body;

  let firstName = parseInt(data.firstName);
  let lastName = parseInt(data.lastName);
  let rating = parseInt(data.rating);
  let birthday = parseInt(data.birthday);
  let country = parseInt(data.country);

  let player = parseInt(data.fullname);

  let queryUpdatePlayer = `UPDATE Players SET firstName = ?, lastName = ?, rating = ?, birthday = ?, country = ?
  WHERE Players.playerID = ?`;
  let selectPlayer = `SELECT * FROM Players WHERE playerID = ?`;

  db.poolquery(
    queryUpdatePlayer,
    [firstName, lastName, rating, birthday, country, player],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        db.pool.query(
          selectPlayer,
          [firstName, lastName, rating, birthday, country],
          function (error, rows, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              res.send(rows);
            }
          }
        );
      }
    }
  );
});

app.post("/createGame-ajax", function (req, res) {
  let data = req.body;

  query1 = `INSERT INTO Games ()`
})

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
