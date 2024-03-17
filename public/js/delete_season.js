// Citation for below functions:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteSeason(seasonID) {
    let link = "/delete-season-ajax/";
    let data = {
      id: seasonID,
    };
  
    $.ajax({
      url: link,
      type: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(seasonID);
      },
    });
  }
  
  function deleteRow(seasonID) {
    let table = document.getElementById("seasons-table");
    for (let i = 0, row; (row = table.rows[i]); i++) {
      if (table.rows[i].getAttribute("data-value") == seasonID) {
        table.deleteRow(i);
        break;
      }
    }
  }
  
