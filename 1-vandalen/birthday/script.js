/*global window */
/*global document */
window.onload = function(){
    
    "use strict"; 
    
    var birthday = function(date){ 
        var userBirthday, dayInMilliseconds, birthday, today, daysLeft;
        //var compareVar = /(\d{4})-(\d{2})-(\d{2})-(\d{2})/; //used for checking the date format (YYYY-MM-DD) 
        if((! Date.parse(date.toString())) || (Date.parse(date.toString).isNaN))
        {
            return [false, "Inte ett giltigt format för datumet. YYYY-MM-DD skall användas"];
        }
        else
            
            today = Date.now();
        dayInMilliseconds = 86400000;
        birthday = date.split('-');       
        birthday.splice(0, 1); //removed the year from birthday since it is not relevant.
        
        userBirthday = new Date(new Date().getFullYear(), birthday[0]-1, birthday[1]);
        if(userBirthday < new Date())
        {
            userBirthday = new Date(new Date().getFullYear()+1,birthday[0]-1,birthday[1]);
            console.log(today);
            console.log(userBirthday);
            daysLeft = Math.ceil(Math.abs(today - userBirthday) / dayInMilliseconds); //Using Math.abs since I want the absolute number 
            if(daysLeft === 365)
            {
                return 0;
            }
            else
            {
                return daysLeft;
            }
        }        
        else
        {
            return Math.ceil(Math.abs(today - userBirthday) / dayInMilliseconds);
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
            var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
            var message;
            switch (answer){
                case 0: message = "Grattis på födelsedagen!";
                    break;
                case 1: message = "Du fyller år imorgon!";
                    break;
                default: message = "Du fyller år om " + answer + " dagar";
                    break;
            }
            
            p.innerHTML = message;
        } catch (error){
            p.classList.add( "error"); // Växla CSS-klass, IE10+
            p.innerHTML = error.message;
        }
        
    });       
    
};