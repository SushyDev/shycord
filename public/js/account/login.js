const client = new Discord.Client();
var socket = io();

//Check if token exists, if not then go to login, else login and start loading guilds
function login() {
  var token = localStorage.getItem('token')
  if (token == null) {
      window.location.replace("/client/login.html")
  } else {
      client.login(token);
      client.on('ready', async => {
      console.log("Sucessfully logged into: " + client.user.tag)
      loadGuilds();
      });
      
  }
}

//On logout remove the token from localstorage
function logout() {
    localStorage.removeItem("token");
    location.reload();    
}

