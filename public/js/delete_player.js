function deletePlayer(playerID) {
    let link = '/delete-player-ajax/';
    let data = {
      id: playerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(playerID);
      }
    });
  }
  
  function deleteRow(playerID){
      let table = document.getElementById("player-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == playerID) {
              table.deleteRow(i);
              break;
         }
      }
  }