//Create the guilds list
function loadGuilds() {
  
    //Clears the active guild and channel
    localStorage.removeItem("activeGuild");
    localStorage.removeItem("activeChannel");
  
    //For each guild add an icon
    client.guilds.map(guild => {
    if (guild.iconURL == undefined) {
      guildIcon = "https://cdn.glitch.com/2c40ffa1-554e-4d31-982d-b4cdd2b8d265%2Fclyde.png.png?v=1549279992422"
    } else {
      guildIcon = guild.iconURL
    }
  
    var guildName = guild.name
    var guildID = guild.id;
    var guildIcon;
    var activeGuildID = '"'+guildID+'"'
    var button = document.createElement("button");
  
    button.className = "guild-button";
    button.title = guildName;
    button.innerHTML = `<img src='`+guildIcon+`' class='guild-icon' onclick='loadChannels(`+activeGuildID+`)'>`;
  
    document.getElementById('guilds-list').appendChild(button);
    });
  }