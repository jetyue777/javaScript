/////////////////////////////////
// Lecture: let and const

// ES5 is fully supported in all modern browsers
// ES6 is partially supported in modern browsers, can't be used in production today (2016)

/*
        ES6 NEW Features
        * Variable Declarations with "let" and "const"
        * Blocks and IIFEs
        * Strings
        * Arrow Functions
        * Destructuring
        * Arrays
        * The Spread Operator
        * Rest and Default Parameters
        * Maps
        * Classes and Subclasses
 */

//        * Variable Declarations with "let" and "const"

/*
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
// const is for values that we do not want to change
const name6 = 'Jane Smith';

//let is like the old var, able to change later on
let age6 = 23;
//name6 = 'Jane Miller';
console.log(name6);

/!*
        Variables declared in var in ES5 are function scoped,
        but variables declared with let and const in ES6 are block-scoped.
 *!/

// ES5
function driversLicence5(passedTest) {
    //var firstName hoisted on the top of the function scope
    
    if (passedTest) {
        console.log(firstName);
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    
    //still able to use firstName and yearOfBirth
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence5(true);


// ES6
function driversLicence6(passedTest) {
    
    //console.log(firstName);
    //with let and const, the variables are not function scoped, but block scoped

    //now we can not use an variable before it was really declared
    //variable is still hoisted though
    //console.log(firstName);

    let firstName;
    const yearOfBirth = 1990;

    //What is a block?
    // a block is code that is wrapped within the {}
    if (passedTest) {

        //new block here
        //define using let or const here can not be accessed outside the block
        firstName = 'John';
    }
    
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence6(true);


//ES5
var i = 23;

for (var i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i); //does not print 23 because i hoisted on top of function scope


//ES6
let j = 23;

for (let j = 0; j < 5; j++) {
    //j here is block scoped!
    console.log(j);
}

console.log(j); //prints out 23!!

*/



/////////////////////////////////
// Lecture: Blocks and IIFEs
/*

// ES6
// Block to achieve data privacy
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b); //does not output anything
console.log(c);


// ES5
// in ES5, we have to use IIFEs to achieve data privacy
(function() {
    var c = 3;
})();

//console.log(c);
*/




/////////////////////////////////
// Lecture: Strings

/*let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
// Template Literals (use back ticks ` instead of quotation ')
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('Sm'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));*/




/////////////////////////////////
// Lecture: Arrow functions
/*
const years = [1990, 1965, 1982, 1937];

// ES5
//inside map we have call back function
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);


// ES6
// in ES6 we have a simpler way to represent call back function
// if return statement is 1 line, then we don't need to use {}
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

//use (el, index), use () when passing in two arguments
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

// if we have more than 1 line, then we also need to use the {}
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;

    //need to write out the return keyword inside {}
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);*/




/////////////////////////////////
// Lecture: Arrow functions 2
/*
    The biggest advantage of arrow function is that they share the
    surrounding "this" keyword.

    Unlike normal functions, => function does not get its own "this"
    keyword.

    => function does not have the "this" keyword, they simply use
    the "this" keyword of the function they are written in.
 */

/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        // here, this points to the calling object (box5)
        // method call
        console.log(this);
        console.log('111111111');
        document.querySelector('.green').addEventListener('click', function() {
            //here, this points to window, call back function
            console.log(this);
            console.log('2222222222');
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
//box5.clickMe();
//outputs "This is box number undefined and it is undefined."

var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {

        //common pattern to avoid this is to create a new variable
       var self = this;

       document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
//box5.clickMe();


// ES6
// => function share the surrounding "this" keyword
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            // => function share the surrounding "this" keyword
            // always use => when you need to preserve the value of "this" keyword
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();


const box66 = {
    color: 'green',
    position: 1,
    // => function also share the surrounding outside "this" keyword
    clickMe: () => { //outputs "This is box number undefined and it is undefined."

        console.log(this);  //window global context
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box66.clickMe();
//outputs "This is box number undefined and it is undefined."



function Person(name) {
    this.name = name;
}

// ES5 not working!!!
Person.prototype.myFriends1 = function(friends) {

    console.log(this);  //this points to "Chris" object
    console.log('1111111111');
    var arr = friends.map(function(el) {
        console.log(this);  //call back this points to window
        console.log('2222222222');
        //no name on window!!
        return this.name + ' is friends with ' + el;
    });

    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('Chris').myFriends1(friends);
// no name Chris print out

// ES5 working using bind
// var self = this also works
Person.prototype.myFriends5 = function(friends) {
    
    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el; 
    }.bind(this)); // bind creates a COPY of the function
    
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);


// ES6
Person.prototype.myFriends6 = function(friends) {

    // => does not have its own this keyword, but share surrounding keyword
    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);
*/




/////////////////////////////////
// Lecture: Destructuring

/*
    Destructuring gives us a convenient way to extract data out
    from a structure such as an array or object

    imaging we want to store each element of an array into single variable
 */

/*
// ES5

// if array is large, then not convenient to do this
var john = ['John', 26];
//var name = john[0];
//var age = john[1];


// ES6
// Destructured the data structure here using []
const [name, age] = ['John', 26];
console.log(name);
console.log(age);


const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

// use {} here to destruct here
// new variable names here have to match the object keys
const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

//if we don't want the variable name to match the key name
const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);


//more practical example of destructuring is to return multiple values
//from a function
// In ES5 if we want to return more than 1 value, we usually return an object
// But in ES6, we can return an array, then use destructuring
function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}


const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);

*/



/////////////////////////////////
// Lecture: Arrays

/*
//does not return an array, but return a node list
const boxes = document.querySelectorAll('.box');

//ES5
//had to use Array.prototype.slice.call here to convert into array
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});

//ES6
// new Array method (from) to transform into array
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//loops
//ES5
//Can not use break or continue in Array foreach or map !!!
//if we want to use break or continue, we have to use normal for loop
for(var i = 0; i < boxesArr5.length; i++) {
    
    if(boxesArr5[i].className === 'box blue') {
        continue; //Can not use break or continue in Array foreach or map !!!

    }
    
    boxesArr5[i].textContent = 'I changed to blue!';
    
}


//ES6
// new "for of" loop, works with break or continue statement
for (const cur of boxesArr6) {
    //cur.className === 'box blue' also works
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}




//ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full);

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
//New array methods
// pass call back function to find the index that meets
//only return the first one that meets
console.log(ages.findIndex(cur => cur >= 17));
// pass call back function to find the value that meets
//only return the first one that meets
console.log(ages.find(cur => cur >= 17));

*/



/////////////////////////////////
// Lecture: Spread operator
// new operator in javaScript
// convenient way to expand elements of an array
// in places like arguments or function call
/*
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

//ES5
var ages = [18, 30, 12, 21];
// apply same as call, but pass an array as argument into the function
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
// ... is the spread operator
// ...ages expand or spread the array into into components
const sum3 = addFourAges(...ages); //same as writing addFourAges(18, 30, 12, 21);
console.log(sum3);

// more use cases for joining array
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);


const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

//Array.from(all).forEach(cur => cur.style.color = 'purple');
all.forEach(cur => cur.style.color = 'purple');
console.log(all); //all is an array

*/




/////////////////////////////////
// Lecture: Rest parameters
/*
    Rest parameters allow us to pass an arbitrary number of
    arguments into a function, and use these arguments in that function

    Rest Parameters (...) look exactly the same as the Spread Operators,
    but they are very different

    Rest Parameters (...) receives a number of single values and transform
    them into a single array when we call function with multiple parameters
 */

/*
//ES5
function isFullAge5() {
    //console.log(arguments);
    //the arguments keyword is what each execution context has access to
    // argument is not an array.

    var argsArr = Array.prototype.slice.call(arguments);
    
    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= 18);
    })
}


//isFullAge5(1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
//Rest Parameters in ES6
function isFullAge6(...years) {
    years.forEach(cur => console.log( (2016 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965, 2016, 1987);


//ES5
function isFullAge5(limit) {
    console.log(limit); //16
    //can pass second parameter into slice function as start index
    var argsArr = Array.prototype.slice.call(arguments, 1);

    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= limit);
    })
}


isFullAge5(16, 1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log( (2016 - cur) >= limit));
}

isFullAge6(16, 1990, 1999, 1965, 2016, 1987);

*/



/////////////////////////////////
// Lecture: Default parameters

// use default parameter when we want one or more parameter of a function
// to be preset, so we want them to have a default value

/*
// ES5
function SmithPerson1(firstName, yearOfBirth, lastName, nationality) {
    
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


//ES6
function SmithPerson2(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


//JavaScript allows us to call a function without specifying all the arguments

var john = new SmithPerson1('John', 1990);
var emily = new SmithPerson2('Emily', 1983, 'Diaz', 'spanish');


*/


/////////////////////////////////
// Lecture: Maps
/*/!*
    Maps is a data structure that is entirely new in ES6
    New Key Value data structure in ES6

    In Maps, we can use anything for the keys.
    In Objects, we are limited to Strings (not really), but in Maps, we can use any primitives
    values like numbers, strings or booleans. And we can EVEN use functions or Objects
    as keys!!!

 *!/
//create new Map
const question = new Map();

//set key value pairs in the Map
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));
//console.log(question.size);


if(question.has(4)) {
    //question.delete(4);
    //console.log('Answer 4 is here')
}

//question.clear();


//Map is iterable; we can not do this in Object
//First way is to use the forEach Method

question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

//Second way is to use for of loop
//need to use question.entries() to return all the key value pairs
//[key, value] use destructuring to story key value pair
for (let [keyjet, value] of question.entries()) {
    if (typeof(keyjet) === 'number') {
        console.log(`Answer ${keyjet}: ${value}`);
        question.set(keyjet, 'ok i change');
    }
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));

/!*

    Why maps are better than object?

    1) we can use anything as keys, for object we ca not do (obj.5 or obj.true)
        but for map, we can do map.get(5) or map.get(true)

    2) Maps are iterable, making it very easy to loop through them and to manipulate
        data with them (map.set(k,v))

    3) Very easy to get the size of the map using .size property

    4) Add or remove data easily in a map

 *!/*/


/////////////////////////////////
// Lecture: Classes


/*
        Classes is not really anything new to the language
        they are just synthetic sugar over the way we do Prototype Inheritance
        in JavaScript

        Classes makes it easier to implement inheritance and create object
        base on blueprints (function constructors in ES5)

 */
//ES5
/*
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

john5.calculateAge();

//ES6
//class declaration

//Class definition are not hoisted!
// Need to first implement a class then use it
// we can only add methods to class, but not properties
// for ES5 prototype inheritance, we could add properties (but not best practice anyway)
class Person6 {

    //ALL classes must have the constructor method
    //similar to function constructor
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    //no "function" keyword here
    // use for inheritance
    calculateAge() {
        console.log(this);
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    //similar as static function in Java
    // can be used directly: Person6.greeting
    // methods that are attached to the class
    static greeting() {
        console.log(this.prototype);
        console.log('Hey there!');
    }
}

//instance are not going to inherit static method
const john6 = new Person6('John', 1991, 'teacher');

john6.calculateAge();

//static method attached to class definition
//Class definition is under the hood a function definition (an Object)
//we can attach method to object
Person6.greeting();

*/



/////////////////////////////////
// Lecture: Classes and subclasses

//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {

    //inside subclass, we need to call our SUPER class (Person 5)
    // Why do we call the superclass function constructor with this keyword?

    //STEP 1:

    /*/
            need to remember how the new operator work
            A new object is created, then function constructor is called,
            this keyword will point to the new empty object
            if we want the new Person properties name to be set to the new
            Athlete object, then we need to call the Person Function Constructor
            with this keyword pointing to our newly created athlete object

            After this, all the properties will be set to the new Athlete object,
            that's created by the new operator
     */

    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}

//STEP 2
// here to create the correct prototype chain
//Object.create allows us to manually set the prototype of an object
//we want the prototype of the Athlete to be the prototype of the Person
Athlete5.prototype = Object.create(Person5.prototype);

//if we use this, also work, but there will be no prototype chain hierarchy
//Athlete5.prototype = Person5.prototype;


// need to be after the previous code
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

Person5.prototype.sayJet = function() {

    console.log("how are you doing jet");
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();


//ES6

//super class Person
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

//Subclass Athlete
//use extends keyword
class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {

        //super keyword to call the SUPER class
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();




/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}


class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area; //km2
        this.numTrees = numTrees;
    }
    
    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    
    classifyStreet () {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}


const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


function calc(arr) {
    
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    
    return [sum, sum / arr.length];
    
}


function reportParks(p) {
    
    console.log('-----PARKS REPORT-----');
    
    // Density
    p.forEach(el => el.treeDensity());
    
    // Average age
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);
    
    // Which park has more than 1000 trees
    const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more than 1000 trees.`);
    
}


function reportStreets(s) {
    
    console.log('-----STREETS REPORT-----');
    
    //Total and average length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
    
    // CLassify sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);
