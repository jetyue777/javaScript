//Everything is an object in JavaScript, Except primitives value
//Primitives: Numbers, Strings, Booleans, Undefined, null
//Everything else is an Object:
    //Array, Functions, Objects, Dates, Wrappers for Numbers, Strings, Booleans

/*
    Object Oriented Paradigm

    Object Oriented Programming: (makes heavy use of Object, Properties and Methods)
        * Objects interacting with one another through methods and properties to form complex applications
        * Used to store data, structure applications into modules and keeping code clean

 */




/////////////////////////////
// Lecture: Function constructor
// Constructors and Instances in JavaScript
// we can use special Person object as a BluePrint to create many persons object

// Writing john object using the object literal
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

// Imaging we want want to create many similar objects with name ...
// We can use Function Constructor


// in many other languages, the following code is called a Class
// But in JavaScript, we would like to call it "Constructors" or "Prototype"
// Base on this constructor, we can create as many instances as we want.
// Constructor acts as a BluePrint, which is used to create instances, which is also Objects
// Each and every object we create is an instance of the "Object" constructor, which has many methods
//  in its prototype property. eg. toString()

// Convention: We always Write Function Constructor start with Capital letter
//
var Person = function(name, yearOfBirth, job) {

    // we want to attach the pass in arguments to the "this" variable of the function's execution context

    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

    //also work john.calculateAge()
    //##### But imaging we have 100 methods each with hundreds line of code,
    //then each instance (john, jane, mark) of Person will have a copy of all these methods
    //not very efficient, 3 copies of the same thing
    //use inheritance here!!!

/*    this.calculateAge = function() {
        console.log(2016 - this.yearOfBirth);
    }*/
};


/*
 Inheritance: when object is based on another object.
 when object gets the access of the other project's method and properties


 JavaScript Inheritance:

 JavaScript is a PROTOTYPE based language, which means inheritance works by using Prototype:
 Each JavaScript Object has a Prototype property, which makes inheritance possible in JavaScript

 How does Inheritance actually work?
 Back to Person Example. Person Object is the constructor and John is one of the instances
 If we want John to inherit some method or property from the Person Object,
 ### we have to add that method or property to the Person's Prototype Property (Person.prototype) ### Eg. Person.prototype.calculateAge

 The Person's prototype property is the Prototype of John
 */

// calculateAge method in Person Constructor BluePrint
//Each JavaScript Object has a Prototype property, which makes inheritance possible in JavaScript
// Add calculateAge method to the Person's prototype property
Person.prototype.calculateAge  = function() {
    console.log(2016 - this.yearOfBirth);
};

//not very common to attach properties to prototype property
Person.prototype.lastName = 'Smith';

// Created from the person Constructor, they are person instances
// If we want John to inherit some method or property from the Person Object,
//### we have to add that method or property to the Person's Prototype Property (Person.prototype))### Eg. Person.prototype.calculateAge
//John Inherit the method calculateAge and property lastName

// Instantiation: objects here are instances of the Person object
/* How does the "new" operation work?
    1) A brand new empty object is created
    2) Function Constructor is called with the argument we specified
    3) calling a function creating a new Execution Context, that also has a this variable
    4) "this" variable points to the new object created at the beginning of by the "new" operator
        (not the global object, although it's a regular function call)

  */

//NONE of the object here has the "calculateAge" method attached to them!!!
//But they can use "calculateAge" method because the method is in their prototype (john.__proto__)
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

/*
*       #############Prototype Chain makes Inheritance possible in JavaScript
*
*
*  John Prototype () -> Person Prototype (calculateAge) -> Object Prototype (toString() ... ) -> null (final link)
*
*  When we try to access a certain Method or Property on an Object (eg, john.calculateAge()),
*  JavaScript will try to find that method on that exact object (john).
*  But if it can not find it, it will look into the object's prototype (which is the prototype property of its parent)
*   So it moves up in the prototype chain, if the method is still not there, it continues until there's no more
*   prototype to look at, which is null, null is the only one that has no prototype, (undefined returned)
*
*
* **************************SUMMARY *******************************
*
* 1) Every JavaScript object has a prototype property, which makes inheritance possible in JavaScript.
* 2) The prototype property of an object (eg Person.prototype) is where we put methods and properties
*       that we want other objects to inherit (eg. john)
* 3) The Constructor's prototype property (eg Person.prototype) is NOT
*       the prototype of the Constructor itself (Person.__proto__),
*       it's the prototype of ALL instances that are created through it (eg, john.__proto__);
* 4) When a certain method (or property) is called, the search starts in the object itself (john),
*       and if it cannot be found, the search moves on to the object's prototype (john.__proto__ same as Person.prototype).
*       This continues until the method is found: prototype chain.
* */

//john.prototype is undefined
//john.__proto__ is same as Person.prototype
//john.__proto__ is the prototype of the john object
//john.__proto__ === Person.prototype
//true
// Person.prototype is NOT same as Person.__proto__ (prototype of Person itself)

john.calculateAge();
jane.calculateAge();
mark.calculateAge();



console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);


/*
    Due to prototype chain, we can use the hasOwnProperty function on john object

     john.hasOwnProperty('job')
        true
     john.hasOwnProperty('lastName')    //lastName is not john's own property
        false                               //it's inherited from the Person's Prototype property


     john instanceof Person
     true

 */




/////////////////////////////
// Lecture 2: Object.create
// Function constructor pattern to create instance of the object from blueprint
// But there are more ways to create Object and Inheritance
    // Object.create is one of them

//First we define an object that acts as a Prototype
//Then we create an object base on this Prototype


var personProto = { //not function constructor, just an Object now
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth); //no yearOfBirth here!!!
    }
};

/*
    Difference between using Object.create vs Function Constructor:

    1) Object.create builds an object (jet) that inherits directly
        from the object (personProto) we passed into the first argument
    2) Function Constructor: the newly created object (john) inherits from
        the Constructor's prototype property (Person.prototype)

 */
var jet = Object.create(personProto);
jet.name = 'John';
jet.yearOfBirth = 1990;
jet.job = 'teacher';

//Object.create accepts the second parameter
/*
 [ static, Object ] Object.create( [ Object ] proto,
 [ Object, optional ] props )
 */
var bill = Object.create(personProto, {

            //we have to do it like this (strange way)
    name: { value: 'Bill' },    //have to use the value "keyword"
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});



/////////////////////////////
// Lecture: Primitives vs objects

/*
    Difference between Primitives vs Objects
        1) Variable containing primitives actually hold the value inside the variable itself
        2) Variable associated with Object do not actually contain the object.
            but instead, the variable contains the reference to the place in memory where the
            object is stored. The variable that declares the object does not have the real copy
            of the object. It just points to the object.


 */
/*

// *****************Primitives
var a = 23;
var b = a;
a = 46;
console.log(a); //46
console.log(b); //23



// *****************Objects
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;    //new reference point to the originally created object. no new object is created
obj1.age = 30;
console.log(obj1.age);      //both are 30
console.log(obj2.age);      //both are 30

// *****************Functions
// Inside function, it works exactly the same way.
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {

    // change value of a does not change variable age
    // when we pass a primitive into a function, a simple value is created
    // we can change a here as much as we want without affecting variable outside
    a = 30;

    //change property city of b changes the property value of obj object
    // we pass the reference of the object into the function
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);       //27
console.log(obj.city);      //San Francisco
*/



/////////////////////////////
// Lecture: Passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}


var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(rates);



/////////////////////////////
// Lecture: Functions returning functions
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');


teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
designerQuestion('Mike');

interviewQuestion('teacher')('Mark');
*/



/////////////////////////////
// Lecture: IIFE
/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();


(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

//console.log(score);


(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);
*/



/////////////////////////////
// Lecture: Closures
/*
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementGermany(1990);
retirementUS(1990);
retirementIceland(1990);

//retirement(66)(1990);


function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestion('teacher')('John');
*/



/////////////////////////////
// Lecture: Bind, call and apply
/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');

john.presentation.call(emily, 'friendly', 'afternoon');

//john.presentation.apply(emily, ['friendly', 'afternoon']);

var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');


// Another cool example
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);
*/




/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/


/*
(function() {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans) {
        if (ans === this.correct) {
            console.log('Correct answer!');

        } else {
            console.log('Wrong answer. Try again :)')
        }
    }

    var q1 = new Question('Is JavaScript the coolest programming language in the world?',
                          ['Yes', 'No'],
                          0);

    var q2 = new Question('What is the name of this course\'s teacher?',
                          ['John', 'Micheal', 'Jonas'],
                          2);

    var q3 = new Question('What does best describe coding?',
                          ['Boring', 'Hard', 'Fun', 'Tediuos'],
                          2);

    var questions = [q1, q2, q3];

    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = parseInt(prompt('Please select the correct answer.'));

    questions[n].checkAnswer(answer);
})();
*/



/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/


/*
(function() {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans, callback) {
        var sc;
        
        if (ans === this.correct) {
            console.log('Correct answer!');
            sc = callback(true);
        } else {
            console.log('Wrong answer. Try again :)');
            sc = callback(false);
        }
        
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('------------------------------');
    }
    
    
    var q1 = new Question('Is JavaScript the coolest programming language in the world?',
                          ['Yes', 'No'],
                          0);

    var q2 = new Question('What is the name of this course\'s teacher?',
                          ['John', 'Micheal', 'Jonas'],
                          2);

    var q3 = new Question('What does best describe coding?',
                          ['Boring', 'Hard', 'Fun', 'Tediuos'],
                          2);
    
    var questions = [q1, q2, q3];
    
    function score() {
        var sc = 0;
        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }
    var keepScore = score();
    
    
    function nextQuestion() {

        var n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();

        var answer = prompt('Please select the correct answer.');

        if(answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            
            nextQuestion();
        }
    }
    
    nextQuestion();
    
})();
*/