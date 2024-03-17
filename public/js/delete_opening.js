// Citation for below functions:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteOpening(ecoCode) {
    let link = "/delete-opening-ajax/";
    let data = {
      id: ecoCode,
    };
  
    $.ajax({
      url: link,
      type: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(ecoCode);
      },
    });
  }
  
  function deleteRow(ecoCode) {
    let table = document.getElementById("openings-table");
    for (let i = 0, row; (row = table.rows[i]); i++) {
      if (table.rows[i].getAttribute("data-value") == ecoCode) {
        table.deleteRow(i);
        break;
      }
    }
  }
  
