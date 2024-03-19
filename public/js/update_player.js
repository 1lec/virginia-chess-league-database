//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updatePlayerForm = document.getElementById("update-player-form-ajax");

updatePlayerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputplayerID = document.getElementById("select-playerID");
  let inputFirstName = document.getElementById("input-updateFirstName");
  let inputLastName = document.getElementById("input-updateLastName");
  let inputRating = document.getElementById("input-updateRating");
  let inputBirthday = document.getElementById("input-updateBirthday");
  let inputCountry = document.getElementById("input-updateCountry");

  console.log("Full Name: ", inputplayerID)
  console.log("Updated First Name: ", inputFirstName)
  console.log("Updated Last Name: ", inputLastName)
  console.log("Updated Rating: ", inputRating)
  console.log("Updated Birthday: ", inputBirthday)
  console.log("Updated Country: ", inputCountry)

  let playerIDValue = inputplayerID.value;
  let firstNameValue = inputFirstName.value;
  let lastNameValue = inputLastName.value;
  let ratingValue = inputRating.value;
  let birthdayValue = inputBirthday.value;
  let countryValue = inputCountry.value;

  console.log("Full Name: ", playerIDValue)
  console.log("Updated First Name: ", firstNameValue)
  console.log("Updated Last Name: ", lastNameValue)
  console.log("Updated Rating: ", ratingValue)
  console.log("Updated Birthday: ", birthdayValue)
  console.log("Updated Country: ", countryValue)

  let data = {
    playerID: playerIDValue,
    firstName: firstNameValue,
    lastName: lastNameValue,
    rating: ratingValue,
    birthday: birthdayValue,
    country: countryValue,
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-player-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updateRow(xhttp.response, playerIDValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input!");
    }
  };
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, playerID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("players-table");

  for (let i = 0, row; (row = table.rows[i]), i++; ) {
    if (table.rows[i].getAttribute("data-value") == playerID) {
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // 1 should be first name, 2: last name, 3: rating, 4: birthday, 5: country
      let td1 = updateRowIndex.getElementsByTagName("td")[1];
      let td2 = updateRowIndex.getElementsByTagName("td")[2];
      let td3 = updateRowIndex.getElementsByTagName("td")[3];
      let td4 = updateRowIndex.getElementsByTagName("td")[4];
      let td5 = updateRowIndex.getElementsByTagName("td")[5];

      td1.innerHTML = parsedData[0].firstName; //should be first name???
      td2.innerHTML = parsedData[1].lastName;
      td3.innerHTML = parsedData[2].rating;
      td4.innerHTML = parsedData[3].birthday;
      td5.innerHTML = parsedData[4].country;
    }
  }
}
