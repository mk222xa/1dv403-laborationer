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

    //variables for the popup
    var modalName = doc.createElement("p");
    var modalSurname = doc.createElement("p");
    var modalZipcode = doc.createElement("p");
    var modalEmail = doc.createElement("p");
    var modalPricemodel = doc.createElement("p");

    var backgroundDiv = doc.createElement("div");
    backgroundDiv.id = "background";

    var modalDiv = doc.createElement("div");
    modalDiv.id = "modalDiv";

    var cancelButton = doc.createElement("button");
    cancelButton.id = "cancelButton";
    cancelButton.textContent = "Avbryt";

    var okButton = doc.createElement("button");
    okButton.id = "okButton";
    okButton.setAttribute("type", "submit");
    okButton.setAttribute("form", "webform");
    okButton.textContent = "Bekräfta köp";

    var modalHeader = doc.createElement("h1");
    modalHeader.id = "modalHeader";
    modalHeader.textContent = "Vänligen bekräfta ditt köp";

    //Variables for regexp 
    var nameRegexp = /^[a-zA-Z-åäöÅÄÖ]*[a-zA-Z-åäöÅÄÖ]+[a-zA-Z-åäöÅÄÖ]*$/;
    var zipcodeRegexp = /^(SE)*\s*\d{3}[\ \-]*\d{2}$/;
    var emailRegexp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; //matches most emailadresses, does not allow ÅÄÖ. 

    //Variables for messages
    var nameError = "Ej korrekt ifylld";
    var zipError = "Ej korrekt format på postnummer";
    var emailError = "Ej korrekt format på emailadress";

    //Checking the fields onblur
    name.onblur = function () {
        validate(name, nameRegexp, nameError);
    };
    surname.onblur = function () {
        validate(surname, nameRegexp, nameError);
    };
    zipcode.onblur = function () {
        validate(zipcode, zipcodeRegexp, zipError);
    };
    email.onblur = function () {
        validate(email, emailRegexp, emailError);
    };

    //Creating the modal popup when clicking the button
    buttonSend.addEventListener("click", function () {
        createPopup();
    }, false);


    //Function for validating the fields
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
    
    //function for removing elements, using a good one stackoverflow. The reason I use it is that I am planning on saving this for future use in bigger projects.
    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }

    //Function for creating the modal popup
    function createPopup() {
        //disabling the submit when creating the popup
        doc.querySelector("button[type=submit]").disabled = true;
        //removing the option to tab while modal is active
        doc.onkeydown = function (e) {
            if (e.keyCode === 9) {
                e.preventDefault();
            }
        };

        //Values for the popup
        modalName.id = "modalName";
        modalName.textContent = "Förnamn: " + name.value;        
        modalSurname.id = "modalSurname";
        modalSurname.textContent = "Efternamn: " + surname.value;        
        modalZipcode.id = "modalZipcode";
        modalZipcode.textContent = "Postnummer: " + zipcode.value;        
        modalEmail.id = "modalEmail";
        modalEmail.textContent = "Email: " + email.value;        
        modalPricemodel.id = "modalPricemodel";
        modalPricemodel.textContent = "Prismodell: " + priceModel.value;
        
        //Inserting the elements
        doc.body.appendChild(backgroundDiv);
        backgroundDiv.appendChild(modalDiv);
        modalDiv.appendChild(modalHeader);
        modalDiv.appendChild(modalName);
        modalDiv.appendChild(modalSurname);
        modalDiv.appendChild(modalZipcode);
        modalDiv.appendChild(modalEmail);
        modalDiv.appendChild(modalPricemodel);
        modalDiv.appendChild(cancelButton);
        modalDiv.appendChild(okButton);

        okButton.addEventListener("click", function () {
            form.submit();
        }, false);

        cancelButton.addEventListener("click", function () {
            doc.getElementById("modalDiv").remove();
            doc.getElementById("background").remove();
            doc.querySelector("button[type=submit]").disabled = false;
        }, false);

    }


};