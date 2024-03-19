// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addOpeningForm = document.getElementById("createOpening-form-ajax");

addOpeningForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputEcoCode = document.getElementById("input-ecoCode");
  let inputVarName = document.getElementById("input-varName");

  let ecoCodeValue = inputEcoCode.value;
  let varNameValue = inputVarName.value;

  let data = {
    ecoCode: ecoCodeValue,
    varName: varNameValue,
  };

  //setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/createOpening-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      addRowToTable(xhttp.response);

      inputEcoCode.value = "";
      inputVarName.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  xhttp.send(JSON.stringify(data));
});

// creates a row from an object; representing one record from Players table

addRowToTable = (data) => {
  let currentTable = document.getElementById("openings-table");

  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  //create a row
  let row = document.createElement("TR");
  let ecoCodeCell = document.createElement("TD");
  let varNameCell = document.createElement("TD");

  let deleteCell = document.createElement("TD");

  // fill the row's cells with the data
  ecoCodeCell.innerText = newRow.ecoCode;
  varNameCell.innerText = newRow.varName;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteOpening(newRow.ecoCode);
  };

  //append the cells to the row
  row.appendChild(ecoCodeCell);
  row.appendChild(varNameCell);
  row.appendChild(deleteCell);

  //add the row to the table
  currentTable.appendChild(row);

  //update a row functionality????
  //********We might not need this for ECO Codes Table */
  // Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  //is this right to have newRow.ecoCode in the text and value? we should be able to update both of them I think.
  option.text = newRow.ecoCode + newRow.varName;
  option.value = newRow.ecoCode;
  selectMenu.add(opton);
};
