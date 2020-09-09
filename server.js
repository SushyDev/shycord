const express = require("express");
const router = express.Router();
const fs = require("fs")
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Everything in this block listens for emits (client side functions) from socket.io
io.sockets
io.on('connection', function(socket){
});

//Make glitch see the project is running
http.listen(3000, function(){
});