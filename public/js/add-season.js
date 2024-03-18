// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addSeasonForm = document.getElementById("createSeason-form-ajax");

addSeasonForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputSeasonName = document.getElementById("input-seasonName");

  let seasonNameValue = inputSeasonName.value;

  let data = {
    seasonName: seasonNameValue,
  };

  //setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/createSeason-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      addRowToTable(xhttp.response);

      inputSeasonName.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  xhttp.send(JSON.stringify(data));
});

// creates a row from an object; representing one record from Players table

addRowToTable = (data) => {
  let currentTable = document.getElementById("seasons-table");

  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  //create a row
  let row = document.createElement("TR");
  let seasonIDCell = document.createElement("TD");
  let seasonNameCell = document.createElement("TD");

  let deleteCell = document.createElement("TD");

  // fill the row's cells with the data
  seasonIDCell.innerText = newRow.seasonID;
  seasonNameCell.innerText = newRow.seasonName;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteSeason(newRow.id);
  };

  //append the cells to the row
  row.appendChild(seasonIDCell);
  row.appendChild(seasonNameCell);
  row.appendChild(deleteCell);

  row.setAttribute("data-value", newRow.seasonID);

  //add the row to the table
  currentTable.appendChild(row);

  //update a row functionality????
  // Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.seasonName;
  option.value = newRow.seasonID; //should this be seasonID?
  selectMenu.add(option);
};
