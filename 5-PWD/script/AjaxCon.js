"use strict";

//Using the method from E12 – Ajax
function AjaxCon(url, callback) {
    var doc = document;

    var READY_STATE_UNINITIALIZED = 0;
    var READY_STATE_OPENED = 1;
    var READY_STATE_SENT = 2;
    var READY_STATE_LOADING = 3;
    var READY_STATE_COMPLETE = 4;

    var xhr = this.getXHR();

    xhr.onreadystatechange = function () {

        if (xhr.readyState === READY_STATE_COMPLETE) {
            if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
                callback(xhr.responseText);     

            } else {
                alert("Läsfel, status:" + xhr.status);
            }
        }
    };

    xhr.open("get", url, true);
    xhr.send(null);

}

AjaxCon.prototype.getXHR = function () {
    var xhr = null;

    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (error) {
            throw new Error("Ajax stöds inte av din webläsare, var vänlig uppgradera till senaste versionen");
        }
    }
    return xhr;
};