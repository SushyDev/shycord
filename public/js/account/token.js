function saveToken() {
    var token = document.getElementById('token').value
    localStorage.setItem("token", token);
    window.location.href = "https://shycord.glitch.me/client/main.html";
  }