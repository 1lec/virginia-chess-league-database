// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addPlayerForm = document.getElementById("createPlayer-form-ajax");

addPlayerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputFirstName = document.getElementById("input-firstName");
  let inputLastName = document.getElementById("input-lastName");
  let inputRating = document.getElementById("input-rating");
  let inputBirthday = document.getElementById("input-birthday");
  let inputCountry = document.getElementById("input-country");

  let firstNameValue = inputFirstName.value;
  let lastNameValue = inputLastName.value;
  let ratingValue = inputRating.value;
  let birthdayValue = inputBirthday.value;
  let countryValue = inputCountry.value;

  let data = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    rating: ratingValue,
    birthday: birthdayValue,
    country: countryValue,
  };

  //setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/createPlayer-ajax", true);
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
