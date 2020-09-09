
//On fucntion sendMessage send message to active channel
function sendMessage(event) {
    var activeChannelID = localStorage.getItem("activeChannel")
    var message = document.getElementById('message-input').value

    client.channels.get(activeChannelID).send(message)
    
    document.getElementById("message-input").value = "";
}
    
//Check if enter is pressed in the input field
function enter(){
  document.getElementById('message-input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      sendMessage();
    }
  }
}