/*global window */
/*global document */


var makePerson = function(persArr){
    "use strict";
    
    // Din kod här...
    var personalInfo, names, ages;
    personalInfo = {},
        names = persArr.map(function(person){
            return person.name;
        }),
        ages = persArr.map(function(person){
            return person.age;
        }).sort(function(a,b){return (a>b)?1:-1});
    
    names.sort(function(a,b){
        return a.localeCompare(b);
    });
    personalInfo.minAge = ages[0];
    personalInfo.maxAge = ages[ages.length-1];
    personalInfo.averageAge = Math.round(ages.reduce(function(a,b){
        return a+b;
    })/ages.length);
    personalInfo.names = names.join(", ");
    
    return personalInfo;
    
};

var person = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}, {name: "Mattias Karlsson", age: 31}, {name: "Amanda Karlsson", age:9}];
var persons = makePerson(person);
console.log(persons);