
"use strict";

var columns = 3;
var rows = 6;

var Memory = {
    
    bricksArray: [],
    triesCounter: 0,
    pairsCounter: 0,
    currentGuesses: 0,
    correctGuess: 0,
    lastGuess: -1,

    init: function () {

        //using the RandomGenerator to set my array
        Memory.bricksArray = new RandomGenerator.getPictureArray(rows, columns);
        Memory.createGameBoard();
    },

    //creating the gameboard and calling the function for creating picture links
    createGameBoard: function () {
        var doc = document;
        var gameBoard = doc.getElementById("gameboard");
        var picture = 0;

        //create table for the gameboard
        for (var i = 0; i < rows; i++) {
            var tr = gameBoard.insertRow();
            for (var j = 0; j < columns; j++) {
                tr.appendChild(Memory.createTd(picture));
                picture++;
            }
        }
    },
    
    //function for creating the picture links
    createTd: function (picture) {
        var doc = document;
        var td = doc.createElement("td");
        var a = doc.createElement("a");
        var img = doc.createElement("img");

        a.setAttribute("href", "#");

        img.setAttribute("src", "pics/0.png");
        img.setAttribute("id", picture);

        a.appendChild(img);
        td.appendChild(a);
        
        //when clicking an <a> tag it calls the brickFlip function that turns the brick
        a.onclick = function () {
            Memory.brickFlip(picture);
        };
        return td;
    },
    
    //function for flipping over a brick
    brickFlip: function (picture) {
        var doc = document;
        var image = doc.getElementById(picture);
        if (image.getAttribute("src") === "pics/0.png") {
            image.setAttribute("src", "pics/" + Memory.bricksArray[picture] + ".png");
            Memory.currentGuesses++;
            
            //checks if two bricks are turned
            if (Memory.currentGuesses === 2) {
                //two bricks turned counts as one guess
                Memory.triesCounter++;
                Memory.currentGuesses = 0;
                console.log(Memory.triesCounter);
                
                //compares the bricks and flips them back if they don´t match
                if (Memory.bricksArray[Memory.lastGuess] != Memory.bricksArray[picture]) {
                    //image is the current brick flipped and lastGuess is the first brick flipped this try
                    Memory.brickClose(image, doc.getElementById(Memory.lastGuess));
                } 
                //counters for correct guesses
                else {
                    Memory.correctGuess++;                    
                }
                
                //Checks if all bricks are turned and prints an endgame message
                if (Memory.correctGuess === (rows * columns / 2)) {
                    //var text = document.getElementById("text");
                    //var result = "Du klarade spelet på " + (Memory.triesCounter) + " försök! Bra jobbat!";
                    //text.innerHTML = result;
                    window.alert("Du klarade spelet på " + (Memory.triesCounter) + " försök! Bra jobbat!");
                }

            } else {
                Memory.lastGuess = picture;
            }
        }
    },    
    //closes the bricks that has been turned if they don´t match
    brickClose: function (firstBrick, secondBrick) {
        setTimeout(function () {
            firstBrick.setAttribute("src", "pics/0.png");
            secondBrick.setAttribute("src", "pics/0.png");            
        }, 1200);
    }
};

window.onload = Memory.init;