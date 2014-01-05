"use strict"

window.onload = function () {

    //Variables for the input fields
    var doc = document;
    var name = doc.getElementById("name");
    var surname = doc.getElementById("surname");
    var zipcode = doc.getElementById("zipcode");
    var email = doc.getElementById("email");
    var priceModel = doc.getElementById("priceModel");
    var buttonSend = doc.getElementById("buttonSend");


    //Variables for regexp 
    var nameRegexp = /^[a-zA-Z-åäöÅÄÖ]*[a-zA-Z-åäöÅÄÖ]+[a-zA-Z-åäöÅÄÖ]*$/;
    var zipcodeRegexp = /^(SE)*\s*\d{3}[\ \-]*\d{2}$/;
    var emailRegexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9\.]+[\.]{1}[a-zA-Z]{2,4}$/;

    //Variables for messages

    var nameError = "Ej korrekt ifylld";
    var zipError = "Ej korrekt format på postnummer";
    var emailError = "Ej korrekt format på emailadress";
    
    //Checking the fields onblur
    name.onblur = function(){validate(name, nameRegexp, nameError);};
    surname.onblur = function(){validate(surname, nameRegexp, nameError);};
    zipcode.onblur = function(){validate(zipcode, zipcodeRegexp, zipError);};
    email.onblur = function(){validate(email, emailRegexp, emailError);};
    
    //function for validating the fields
    function validate(input, regexp, message) {
        if (regexp.test(input.value)) {
            if (doc.getElementById(input.getAttribute("id") + "message") !== null) {
                var invalid = doc.getElementById(input.getAttribute("id") + "message");
                invalid.parentNode.removeChild(invalid);
            }
            return true;
        } else {
            if (doc.getElementById(input.getAttribute("id") + "message") === null) {

                var invalid = doc.createElement("p");
                invalid.setAttribute("id", input.getAttribute("id") + "message");
                invalid.appendChild(doc.createTextNode(message));
                input.parentNode.insertBefore(invalid, input.nextSibling);
            }
            return false;
        }
    }



};