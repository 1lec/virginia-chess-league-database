// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addGameForm = document.getElementById("createGame-form-ajax");

addGameForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let whiteNameValue = document.getElementById("input-whiteFullName").value;
  let blackNameValue = document.getElementById("input-blackFullName").value;
  let gameResultValue = document.getElementById("input-gameResult").value;
  let gameEcoCodeValue = document.getElementById("input-gameEcoCode").value;
  let gameDateValue = document.getElementById("input-gameDate").value;
  let gameSeasonValue = document.getElementById("input-gameSeason").value;
  let gameLocationValue = document.getElementById("input-gameLocation").value;

  let data = {
    whiteName: whiteNameValue,
    blackName: blackNameValue,
    gameResult: gameResultValue,
    gameEcoCode: gameEcoCodeValue,
    gameDate: gameDateValue,
    gameSeason: gameSeasonValue,
    gameLocation: gameLocationValue,
  };

  console.log(data);

  //setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/createGame-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        const games = xhttp.response
        console.log(games);
        addRowToTable(games);



    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  xhttp.send(JSON.stringify(data));
});

// creates a row from an object; representing one record from Games table

addRowToTable = (data) => {
  let currentTable = document.getElementById("games-table");

  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  //create a row
  let row = document.createElement("TR");
  let gameIDCell = document.createElement("TD");
  let whiteIDCell = document.createElement("TD");
  let whiteRatingCell = document.createElement("TD");
  let blackIDCell = document.createElement("TD");
  let blackRatingCell = document.createElement("TD");
  let ecoCodeCell = document.createElement("TD");
  let seasonIDCell = document.createElement("TD");
  let resultIDCell = document.createElement("TD");
  let gameDateCell = document.createElement("TD");
  let locationCell = document.createElement("TD");

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
  deleteCell.onclick = function () {
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
  option.text =
    newRow.firstName +
    newRow.lastName +
    newRow.rating +
    newRow.birthday +
    newRow.country;
  option.value = newRow.id;
  selectMenu.add(opton);
};
