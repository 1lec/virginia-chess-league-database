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
  let query1 = "SELECT * FROM Players;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("index");
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
