//Recieve messages and execute the messages function
client.on('message', message => {
  recieveMessages(message);
});

function sendAttachment(file) {
  var imageUrl = document.getElementById('attachment-button').files[0].path;
  console.log(imageUrl)

  var messageAttachment = document.createElement("img");
    messageAttachment.className = "message-attachment";
    messageAttachment.src = imageUrl;
    messageAttachment.setAttribute("onclick", "window.open("+'"'+imageUrl+'"'+", '_blank')");
    document.getElementById(div).appendChild(messageAttachment);
}

//Recieve messages function checks for images attached to the message and then display them in the message field
function recieveMessages(message) {
  var reader  = new FileReader();
  var activeChannelID = localStorage.getItem("activeChannel")
  var channelID = message.channel.id;

  //Check if attachment is image
  function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    if(url.endsWith(".png")) {return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;}
    if(url.endsWith(".jpg")) {return url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;}
    if(url.endsWith(".gif")) {return url.indexOf("gif", url.length - "gif".length /*or 3*/) !== -1;}
  }

  //If has image attachment then put the image url according to the attachment image
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)){
      var Attachment = (message.attachments).array();
      Attachment.forEach(function(attachment) {
        imageUrl = attachment.url
      })
    }
  }
  
  if(activeChannelID == channelID) {
    var message;
    var id = message.id
    var div = "message-div-" + id
    var avatar = message.author.displayAvatarURL;
    var tag = message.author.tag;
    var name; if(message.author.nickname == undefined) {name = message.author.username} else {name = message.author.nickname}

    //Replaces user mentions with their username instead 
    if (message.content.includes("<@")) {
      var mentionedID = message.content.split(/<@!?/).pop().split('>')[0];
      try {var userid = "@" + message.guild.members.get(mentionedID).user.tag} catch(error) {return;}
      var textWithMention = message.content.replace(/<@!?(\d+)>/, userid)
      message = textWithMention
    } else {
      message = message.content
    }
    
    //Create the message div
    var messageDiv = document.createElement("div")
    messageDiv.className = "message-div";
    messageDiv.id = div;
    document.getElementById('messages-field').appendChild(messageDiv);

    //Create avatar of the message author
    var MessageAvatar = document.createElement("img");
    MessageAvatar.className = "author-avatar";
    MessageAvatar.src = avatar;
    MessageAvatar.title = tag;
    MessageAvatar.setAttribute("onclick", "window.open("+'"'+avatar+'"'+", '_blank')");
    document.getElementById(div).appendChild(MessageAvatar);

    //Create the author button
    var MessageAuthor = document.createElement("Button");
    MessageAuthor.className = "author-button";
    MessageAuthor.innerHTML = name;
    MessageAuthor.title = tag;
    MessageAuthor.id = tag;
    document.getElementById(div).appendChild(MessageAuthor);

    //Create the message text
    var MessageContent = document.createElement("p");
    MessageContent.className = "text-message";
    MessageContent.innerHTML = message;
    document.getElementById(div).appendChild(MessageContent);

    //If message has an image then send the image afterwards
    if(imageUrl != "no-image") {
    var messageAttachment = document.createElement("img");
    messageAttachment.className = "message-attachment";
    messageAttachment.src = imageUrl;
    messageAttachment.setAttribute("onclick", "window.open("+'"'+imageUrl+'"'+", '_blank')");
    document.getElementById(div).appendChild(messageAttachment);
    }

    

    //Scroll to latest message on new message
    try {
      var element = document.getElementById("messages-field");
      element.scrollTop = element.scrollHeight;
    } catch(err) {
      return;
    }
  } else {return;}
}