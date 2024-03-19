//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateSeasonForm = document.getElementById("update-season-form-ajax");

updateSeasonForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputSeasonID = document.getElementById("select-seasonID");
  let inputUpdatedSeasonName = document.getElementById(
    "input-updatedSeasonName"
  );

  let seasonIDValue = inputSeasonID.value;
  let updatedSeasonNameValue = inputUpdatedSeasonName.value;

  console.log("Updated Season Name: ", updatedSeasonNameValue)

  let data = {
    seasonID: seasonIDValue,
    seasonName: updatedSeasonNameValue,
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-season-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updateRow(xhttp.response, seasonIDValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the updated season input.");
    }
  };
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, seasonID) {
  let parsedData = JSON.parse(data);
  let table = document.getElementById("seasons-table");

  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].getAttribute("data-value") == seasonID) {
      let updateRowIndex = table.getElementsByTagName("tr")[i];
      let td = updateRowIndex.getElementsByTagName("td")[1];
      td.innerHTML = parsedData[0].seasonName;
    }
  }
}
