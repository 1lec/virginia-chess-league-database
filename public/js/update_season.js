let updateSeasonForm = document.getElementById('update-season-form-ajax');

updateSeasonForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputSeasonName = document.getElementById("mySelect");
    let inputUpdatedSeasonName = document.getElementById("input-updatedSeasonName");

    let seasonNameValue = inputSeasonName.value;
    let updatedSeasonNameValue = inputUpdatedSeasonName.value;

    if (isNaN(newSeasonNameValue)) {
        return;
    }

    let data = {
        seasonName: seasonNameValue,
        updatedSeasonName: updatedSeasonNameValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "put-season-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, seasonNameValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the updated season input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, seasonID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("seasons-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == seasonID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[1]
            td.innerHTML = parsedData[0].name;
        }
    }
}