// Citation for below functions:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteSeason(seasonID) {
  let data = {
    id: seasonID,
  };
  var xhttp = newXMLHttpRequest();
  xhttp.open("DELETE", "/delete-season-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      deleteRow(seasonID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the delete request.");
    }
  };
  xhttp.send(JSON.stringify(data));
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
