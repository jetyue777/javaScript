/////////////////////////////////////
//JS is always hosted and run on some environment such as browser or nodejs webserver
//JS engine is a program what execute our JS code
//our code is parsed by a Parser to create AST (abstract syntax tree)
//then convert machine code
//then code runs

//Execution Context ******************
//Execution context is a box, a container, or a wrapper which stores variables and in
//which a piece of our code is evaluated and executed
//Global execution context is for code that is not inside any function
//each time when we call a function, it gets its own new execution context
//new function gets new execution context
//new execution context will be put on top of the execution stack
//top most of the execution stack is the active context


//Execution Context in detail *******************
/*Execution Context Object contains
    1) Variable Object (VO)
    2) Scope Chain
    3) "This" variable

  There are two phases:
    1) Creation Phase:
        a) Creation of Variable Object
        b) Creation of Scope Chain
        c) Determine value of "This" variable
    2) Execution Phase:
        The code of the function that generate the current execution context
        is ran line by line
*
* */

// Lecture: Hoisting

// functions
calculateAge(1965);

function calculateAge(year) {
    console.log(2016 - year);
}

// retirement(1956);
var retirement = function(year) {
    console.log(65 - (2016 - year));
}


// variables

console.log(age);
var age = 23;

function foo() {
    console.log(age);
    var age = 65;
    console.log(age);
}
foo();
console.log(age);



/////////////////////////////////////
// Lecture: Scoping

/*
// First scoping example
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}


// Example to show the differece between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    //console.log(c);
    console.log(a+d);
}
*/



/////////////////////////////////////
// Lecture: The this keyword

/*
//console.log(this);

calculateAge(1985);

function calculateAge(year) {
    console.log(2016 - year);
    console.log(this);
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2016 - this.yearOfBirth);
        
        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};


mike.calculateAge = john.calculateAge;
mike.calculateAge();
*/
