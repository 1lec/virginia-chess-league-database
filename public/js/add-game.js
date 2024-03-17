// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addGameForm = document.getElementById("createGame-form-ajax");

addPlayerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputWhiteFullName = document.getElementById("input-whiteFullName");
  let inputBlackFullName = document.getElementById("input-blackFullName");
  let inputGameResult = document.getElementById("input-gameResult");
  let inputGameEcoCode = document.getElementById("input-gameEcoCode");
  let inputGameDate = document.getElementById("input-gameDate");
  let inputGameSeason = document.getElementById("input-gameSeason");
  let inputGameLocation = document.getElementById("input-gameLocation");


  let whiteNameValue = inputWhiteFullName.value;
  let blackNameValue = inputBlackFullName.value;
  let gameResultValue = inputGameResult.value;
  let gameEcoCodeValue = inputGameEcoCode.value;
  let gameDateValue = inputGameDate.value;
  let gameSeasonValue = inputGameSeason.value;
  let gameLocation = inputGameLocation.value;

  let data = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    rating: ratingValue,
    birthday: birthdayValue,
    country: countryValue,
  };

  //setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/createGame-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      addRowToTable(xhttp.response);

      inputFirstName.value = "";
      inputLastName.value = "";
      inputRating.value = "";
      inputBirthday.value = "";
      inputCountry.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  xhttp.send(JSON.stringify(data));
});

// creates a row from an object; representing one record from Players table

addRowToTable = (data) => {
  let currentTable = document.getElementById("players-table");

  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  //create a row
  let row = document.createElement("TR");
  let playerIDCell = document.createElement("TD");
  let firstNameCell = document.createElement("TD");
  let lastNameCell = document.createElement("TD");
  let ratingCell = document.createElement("TD");
  let birthdayCell = document.createElement("TD");
  let countryCell = document.createElement("TD");

  let deleteCell = document.createElement("TD");

  // fill the row's cells with the data
  playerIDCell.innerText = newRow.id;
  firstNameCell.innerText = newRow.firstName;
  lastNameCell.innerText = newRow.lastName;
  ratingCell.innerText = newRow.rating;
  birthdayCell.innerText = newRow.birthday;
  countryCell.innerText = newRow.country;

  deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePlayer(newRow.id);
    };

  //append the cells to the row
  row.appendChild(playerIDCell);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(ratingCell);
  row.appendChild(birthdayCell);
  row.appendChild(countryCell);
  row.appendChild(deleteCell);

  //add the row to the table
  currentTable.appendChild(row);

  //update a row functionality????
  // Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.firstName + newRow.lastName + newRow.rating + newRow.birthday + newRow.country;
  option.value = newRow.id;
  selectMenu.add(opton);

};