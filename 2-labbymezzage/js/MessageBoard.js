"use strict";


    var testMess = new Message("Test", new Date());

    alert(testMess);
    alert(testMess.getText());
    testMess.setText("Ny test text");
    alert(testMess);


window.onload = MessageBoard.init;