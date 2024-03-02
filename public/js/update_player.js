let updatePlayerForm = document.getElementById("update-player-form-ajax");

updatePlayerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputFullName = document.getElementById("mySelect");

  let fullNameValue = inputFullName.value;

  let data = {
    fullname: fullNameValue,
  };

  var xhttp = newXMLHttpRequest();
  xhttp.open("PUT", "/update-player-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updateRow(xhttp.response, fullNameValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input!");
    }
  };
  xhttp.sent(JSON.stringify(data));
});
