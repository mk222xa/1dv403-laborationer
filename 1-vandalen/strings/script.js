/*global window */
/*global document */
window.onload = function() {
    
    "use strict";
    // I denna funktion ska du skriva koden för att hantera "spelet"
    var convertString = function(str){
        // Plats för förändring.		
        // Returnera den konverterade strängen.
        // Vid fel, kasta ett undantag med ett meddelande till användaren.
        var transformedString = "";
        
        try {
            for (var i = 0; i <str.length; i++) {
                var letter = str[i];
                if (letter === letter.toUpperCase()) { //checking if it is an upperCase letter (my variable for each letter) and replacing with a lowerCase, else replacing with an upperCase
                    transformedString += letter.toLowerCase();
                } 
                else {
                    transformedString += letter.toUpperCase();
                }
            }
        }
        catch (error) {
            throw "Något blev fel!";
        }
        finally {
            transformedString = transformedString.replace(/a/gi, "#");  // replacing /a and /gi ignores upper or lower case.          
            return transformedString;
        }        
        
    };
    // ------------------------------------------------------------------------------
    
    
    // Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
    var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
    var input = document.querySelector("#string");
    var submit = document.querySelector("#send");
    
    // Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
    submit.addEventListener("click", function(e){
        e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.
        
        p.classList.remove( "error");
        
        try {
            var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
            p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
        } catch (error){
            p.classList.add( "error"); // Växla CSS-klass, IE10+
            p.innerHTML = error.message;
        }
        
    });
    
    
    
};