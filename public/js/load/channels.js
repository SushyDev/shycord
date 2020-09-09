//Create channel list
function loadChannels(activeGuildID) {

    //Set active guild
    localStorage.setItem("activeGuild", activeGuildID)
  
    //clear channel list then another guild is clicked
    var node = document.getElementById("channels-list");
    node.querySelectorAll('*').forEach(n => n.remove());
  
    //For each channel add button in the list
    client.guilds.get(activeGuildID).channels.map(channel => {
      var channelID = channel.id
      var channelName = channel.name
  
      //if channel is text channel then create the elements
      if(channel.type == "text") {
        var activeChannelID = '"'+channelID+'"'
        var button = document.createElement("button");
        button.className = "channel-button";
        button.innerHTML = `<p onclick='getChannelID(`+activeChannelID+`)'>`+channelName+`</p>`;
        document.getElementById('channels-list').appendChild(button);
      }
    });
  }

//When you click on a channel name it saves the active channel id to local storage and clears the old messages
function getChannelID(activeChannelID) {
    
    //Check if the channel is different from the one already active
    if(activeChannelID != localStorage.getItem("activeChannel")) {
      localStorage.setItem("activeChannel", activeChannelID)
      var node= document.getElementById("messages-field");
      node.querySelectorAll('*').forEach(n => n.remove());
      client.channels.get(activeChannelID).fetchMessages({limit: 100}).then(messages => {
        var sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt)
        sortedMessages.forEach(message => recieveMessages(message))      
      })
    }

    //When a channel is selected focus the message input message
    document.getElementById("message-input").focus();
}