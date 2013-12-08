"use strict";

var MessageBoard = {

    messages: [],

    init: function () {
        //get the message when clicking the button and put it in the array and render on screen
        document.getElementById("post").onclick = function getMessage(e) {
            e.preventDefault();
            var text = document.getElementById("messageInput").value;
            document.getElementById("messageInput").value = "";
            var mess = new Message(text, new Date());
            MessageBoard.messages.push(mess);
            MessageBoard.renderMessages();
        };

        //get the message and put in the array and render on screen
        document.getElementById("messageInput").onkeypress = function (e) {
            var code;
            if (!e) {
                e = window.event;
            }
            if (e.keyCode) {
                code = e.keyCode;
            } else if (e.which) {
                code = e.which;
            }

            if (e.shiftKey && code === 13) {
                document.textarea.value += "\n";
                return false;
            } else if (code === 13) {
                var text = document.getElementById("messageInput").value;
                document.getElementById("messageInput").value = "";
                var mess = new Message(text, new Date());
                MessageBoard.messages.push(mess);
                MessageBoard.renderMessages();
                return false;
            }
        };
    },

    //removes the messages and prints them all from array to screen
    renderMessages: function () {
        
        document.getElementById("messageboard").innerHTML = "";
        
        for (var i = 0; i < MessageBoard.messages.length; ++i) {
            MessageBoard.renderMessage(i);
        }
        // Counter for messages
        var counter = document.getElementById("counter");
        var number = (MessageBoard.messages.length);
        counter.innerHTML = "Antal meddelande : " +number;
    },

    // Creates HTML tags for the new message
    renderMessage: function (messageID) {        
        var text = document.createElement("div");
        var p = document.createElement("p");
        text.className = "messageFromUser";
        p.className = "input";

        // Element for the icons
        var msgIcon = document.createElement("span");
        msgIcon.className = "icons";

        //Date and time icon
        var time = document.createElement("a");
        var imgDateTime = document.createElement("img");
        imgDateTime.className = "datetime";
        imgDateTime.setAttribute("src", "pics/clock.png");
        imgDateTime.alt = "ShowDateTime";

        //Function for showing date and time when the message was created when clicked
        imgDateTime.onclick = function () {
            alert(MessageBoard.messages[messageID].getDateText());
        };

        var removePost = document.createElement("a");
        var imgClose = document.createElement("img");
        imgClose.className = "deletebutton";
        imgClose.setAttribute("src", "pics/delete.png");
        imgClose.alt = "Close";

        //Delete function bound to the delete.png image
        imgClose.onclick = function () {
            var result = confirm("Vill du ta bort meddelandet?");
            if (result === true) {
                MessageBoard.removeMessage(messageID);
            }
        };

        msgIcon.appendChild(time);
        time.appendChild(imgDateTime);
        msgIcon.appendChild(removePost);
        removePost.appendChild(imgClose);

        p.innerHTML = MessageBoard.messages[messageID].getHTMLText();

        var messageTime = document.createElement("p");
        messageTime.className = "time";        
        messageTime.innerHTML = MessageBoard.messages[messageID].getTimeStamp();

        text.appendChild(msgIcon);
        text.appendChild(p);
        text.appendChild(messageTime);

        document.getElementById("messageboard").appendChild(text);
    },

    removeMessage: function (deleteMess) {
        MessageBoard.messages.splice(deleteMess, 1);
        MessageBoard.renderMessages();
    }
};

window.onload = MessageBoard.init;