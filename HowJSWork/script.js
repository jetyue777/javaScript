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

    1. a) Creation of the Variable Object:
        #   the argument object is created, containing all the arguments that were
            passed into the function
        #   the code scans for function declarations, for each function, a property
            is created in the Variable Object, pointing to the function
            //Hoisting - function is available before the execution phase
        #   Lastly, the code is scanned for Variable Declarations; for each variable,
            a property is created in the Variable Object, and set to undefined.
            //Hoisting - variable is set to undefined before the execution phase


*
* */

/*// Lecture: Hoisting
//
// functions

//function declaration
// function execution works before declaration
// In the creation phase of the Execution context, function declaration is stored
// inside the variable object (before the code is executed)
calculateAge(1965);

function calculateAge(year) {
    console.log(2016 - year);
}

// not working for function expression
// because retirement is a variable inside Variable object.
// during Variable Object Creation, the code is scanned for Variable Declarations;
// for each variable, a property is created in the Variable Object, and set to undefined
// ************retirement(1956);************

//function expression
//retirement variable is set to undefined before the execution phase
//Hoisting with functions only work for function declarations
var retirement = function(year) {
    console.log(65 - (2016 - year));
}

//works
retirement(1956);


// variables

console.log(age); //undefined (in the creation phase of the Variable Object,
//code is scanned for Variable Declarations and Variable is set to undefined. No value
var age = 23;   // stored in the Global Execution Context
console.log(age);

//foo gets own execution context object
//
function foo() {
    console.log(age);
    var age = 65;   //defined in the Variable Object in side Execution Context of foo
    console.log(age);
}
foo();
console.log(age);

//most important use case for hoisting is that we can use function before it's declared
//in our code*/

/////////////////////////////////////
// Lecture: Scoping

/*Second step of the Creation Phase of Execution Context:
    Creation of the Scoping Chain

    What does Scoping mean?
    Scoping answers the question, where can we access a certain variable or function.

    In JavaScript, each Function creates a scope, (space / environment) in which the
    variables it defines are accessible

    scope in JavaScript is not created in "if", "for" or "while" blocks
    In JS, the ONLY way to create a scope is to write a new function ************

    ### Lexical Scoping ###
    the function that is lexically within ANOTHER function get access to the scope
    of the outer function


*/

/*
// First scoping example
// Scope chain

// Global Scope
var a = 'Hello!';
first();

function first() {
    // first() scope
    var b = 'Hi!';
    second();

    function second() {

        //second() scope
        //thanks to scoping chain, the second function has
        //the access to the variable in the first() scope (b)
        // and the variable in the Global Scope (a)
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

// The concept of execution context, scope and scope chain is very related.
// Execution stack is different from the scope chain
// Execution Stack is the order of the functions get called
// BUT the scope chain the the order of the functions written in the code

// Example to show the difference between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';

        // second() function is able to call the third() function
        // because of the scope chain
        third()
    }
}

function third() {
    var d = 'John';
    //console.log(c);
    // can not access variables b and c
    // third() is not defined in the second() function
    //console.log(a+b+c+d);
    console.log(a+b+c+d);
}
*/



/////////////////////////////////////
// Lecture: The this keyword

// Determine the value of "this" keyword
// "this" is stored in the Execution Context Object

/* Where does "this" point?

    1. Regular function call: the this keyword points at the global object,
        (the window object, in the browser)
    2. In a method call (calling a function attached to an object): the this
        variable points to the object that is calling the method.

    * the this keyword is not assigned a value until a function where it is
        defined is actually called
* */

console.log(this);    // window

calculateAge(1985);     //regular function call

function calculateAge(year) {
    console.log(2016 - year);

    //Regular function call: the this keyword points at the global object,
    //(the window object, in the browser)
    console.log(this);
}

var calculateA = function(year) {
    console.log(2016 - year);

    //Regular function call: the this keyword points at the global object,
    //(the window object, in the browser)
    console.log(this);
}

calculateA(2011);   //regular function call

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        //when call the method (calling a function attached to an object)
        // using john.calculateAge()
        // the this keyword point to the 'john' object
        console.log(this);
        console.log(2016 - this.yearOfBirth);
        
        function innerFunction() {
            //new Execution Context is created for each new function
            //create Execution Context Object
                //1. Variable Object
                //2. Scope Chain
                //3. Determine value of this later on when function is called

            //Regular function call: the this keyword points at the global object,
            //(the window object, in the browser)

            // this is not a method call.
            console.log(this);
        }

        //Regular function call - execution context execution phase
        //assign value to this by calling the function
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};

//##########Method Borrowing Techniques#############
//no () because we are not calling a method here
mike.calculateAge = john.calculateAge;

//the this keyword is assigned the value until the method is called
// this keyword in calculateAge points to mike object now
mike.calculateAge();
