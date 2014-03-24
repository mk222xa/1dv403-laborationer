"use strict";

window.onload = function () {
    //variables
    var doc = document;
    var imageGallery = doc.getElementById("imageGallery");


    imageGallery.addEventListener("click", function () {

        //Makes sure only one window is active
        if (doc.getElementById("appWindowId")) {
            return false;
        } else

        //Window layout
            var mainContainer = doc.getElementById("container");

        var windowDiv = doc.createElement("div");
        windowDiv.id = "appWindowId";
        windowDiv.className = "appWindow";

        var headerDiv = doc.createElement("div");
        headerDiv.id = "imageViewerHeaderId";
        headerDiv.className = "imageViewerHeaderClass";
        var headerTitle = doc.createElement("p");
        headerTitle.textContent = "Image Viewer";

        var contentDiv = doc.createElement("div");
        contentDiv.id = "contentDivId";
        contentDiv.className = "contentDivClass";

        var statusBar = doc.createElement("div");
        statusBar.id = "imageViewerStatusId";
        statusBar.className = "imageViewerStatusClass";

        //icons      
        var closeButton = doc.createElement("a");
        closeButton.setAttribute("href", "#");
        var closeButtonImage = doc.createElement("img");
        closeButtonImage.id = "closeButtonId";
        closeButtonImage.setAttribute("src", "pics/close.png");
        closeButtonImage.className = "closeButtonClass";

        var loader = doc.createElement("img");
        loader.setAttribute("src", "pics/loader.gif");
        loader.id = "ajaxLoaderId";

        var appIcon = doc.createElement("img");
        appIcon.setAttribute("src", "pics/imageViewerIcon.png");
        appIcon.id = "appIconId";

        //Inserting the elements in their respective places
        closeButton.appendChild(closeButtonImage);
        statusBar.appendChild(loader);
        statusBar.innerHtml = "Laddar...";

        headerDiv.appendChild(appIcon);
        headerDiv.appendChild(headerTitle);
        headerDiv.appendChild(closeButton);

        windowDiv.appendChild(headerDiv);
        windowDiv.appendChild(contentDiv);
        windowDiv.appendChild(statusBar);

        mainContainer.appendChild(windowDiv);


        //Using AjaxCon to connect to the url 
        new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", function (data) {
            var ajaxResponseData = JSON.parse(data);
            var imgThumbWidth = [],
                imgThumbHeight = [],
                imgThumbMaxWidth = 0,
                imgThumbMaxHeight = 0,
                i = 0;

            //Looping through the images and put them in arrays
            for (i = 0; i < ajaxResponseData.length; i++) {
                imgThumbWidth[i] = ajaxResponseData[i].thumbWidth;
                imgThumbHeight[i] = ajaxResponseData[i].thumbHeight;
            }

            //Using Math to calculate the biggest image in the arrays and sets those values to my variables for later use.
            imgThumbMaxWidth = Math.max.apply(Math, imgThumbWidth);
            imgThumbMaxHeight = Math.max.apply(Math, imgThumbHeight);

            //removed the AjaxLoader image I used. 
            loader.remove();            

            //Loops through images and puts them in the contentDiv with a loot and innerHTML.
            for (i = 0; i < ajaxResponseData.length; i++) {
                doc.getElementById("contentDivId").innerHTML += '<div class="galleryImg" style="width:' + imgThumbMaxWidth + 'px; height:' + imgThumbMaxHeight + 'px;"><a class="galleryImgA" href="' + ajaxResponseData[i].URL + '"><img src="' + ajaxResponseData[i].thumbURL + '" /></a></div>';
            }

            //Onclick event for the images so I can use them to change the background
            var imageLinks = doc.querySelectorAll(".galleryImg a");
            for (i = 0; i < imageLinks.length; i++) {
                imageLinks[i].onclick = function () {
                    setBackground(this.href);
                    return false;
                };
            }
            //function for changing the background
            function setBackground(backgroundImage) {
                doc.body.style.background = "url(" + backgroundImage + ")";
            }

        });

        //function for removing windows
        Element.prototype.remove = function () {
            this.parentElement.removeChild(this);
        };
        NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
            for (var i = 0, len = this.length; i < len; i++) {
                if (this[i] && this[i].parentElement) {
                    this[i].parentElement.removeChild(this[i]);
                }
            }
        };

        closeButton.addEventListener("click", function () {
            doc.getElementById("appWindowId").remove();
        }, false);

    }, false);



};