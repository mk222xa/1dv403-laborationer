"use strict";

function Message(message, date) {
    
    this.getText = function () {
        return message;
    };
    
    this.setText = function (_text) {
        message = _text;
    };
    
    this.getDate = function () {
        return date;
    };
    
    this.setDate = function (_date) {
        date = _date;
    };
}
Message.prototype.toString = function () {
    return this.getText() + " (" + this.getDate() + ")";
};

Message.prototype.getHTMLText = function () {
    return this.getText().replace(/[\n\r]/g, "<br />");
};
//Used for the Alert window when clicking the info button
Message.prototype.getDateText = function () {
    return "Inlägget skapades: " + this.getDate().toLocaleString();
};

//Used for timestamp on messages on screen
Message.prototype.getTimeStamp = function() {
    var str = "";
    
    var currentTime = this.getDate();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds;
    
    return str;
};
