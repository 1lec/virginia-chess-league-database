// Citation for below functions:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deletePlayer(playerID) {
  let link = "/delete-player-ajax/";
  let data = {
    id: playerID,
  };

  $.ajax({
    url: link,
    type: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(playerID);
    },
  });
}

function deleteRow(playerID) {
  let table = document.getElementById("players-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].getAttribute("data-value") == playerID) {
      table.deleteRow(i);
      break;
    }
  }
}
