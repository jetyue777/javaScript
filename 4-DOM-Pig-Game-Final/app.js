/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
    After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//only variable declaration here, not assigning the value yet
var scores, roundScore, activePlayer, gamePlaying;

//able to execute function due to hoisting (function declaration)
//creation phase of execution context, Variable Object is created
//code scan through to find function declaration during Variable Object Creation
//for each function, a property
//is created in the Variable Object, pointing to the function
init();

//document object for dom manipulation (object give us access to the dom)
//querySelect is a useful method to select dom object
//select things same as CSS, but only select first element it find, but has workaround
//event listener: a function that performs an action based on a certain event.
// it waits for a specific event to happen

/* How is event then processed?

    Remember about the execution context. (execution stack)
    - Event can only be processed or handled when the execution stack is empty
    - which means all the functions have returned.

    Beside of Execution Stack, we also have "Message Queue" in the javaScript Engine
    This is where all the event that happen in the browser are put.
    These events sit here and wait to be processed (after execution stack becomes empty)

    1) finish executing all functions in Execution stack
    2) Message Queue takes in an event such as "click event"
    3) put clickHandler() on execution Stack



* */

//register an event listener to perform an action to a dom element when specific event occurs
//'click' is one of the many events
//takes in two parameters (event, call back function)

// we don't want to call the anonymous function here, we want the eventListener to call
// the function for us, so we put the the function name as call back

// A callback function is a function that we pass into another function as an argument
// it is not called by us, it's called by another function
document.querySelector('.btn-roll').addEventListener('click', function() {

    //gamePlaying is the state variable in the program
    //a state variable tells us the condition of the system
    if(gamePlaying) {
        // 1. Random number
        //Math.random() return a random number between 0 and 1
        //Math.floor() removes the decimal portion of a number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        //querySelector only selects the first one that matches
        /*
         <img src="dice-5.png" alt="Dice" class="dice" id="dice-1">
         <img src="dice-5.png" alt="Dice" class="dice" id="dice-2">
        * */
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        //change the src attribute
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        // !== does not do type coercion
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            //Use function here to don't repeat yourself (DRY principle)
            nextPlayer();
        }
    }    
});

/*Remember about the execution context. (execution stack)
- Event can only be processed or handled when the execution stack is empty
- which means all the functions have returned.*/
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';

            //should add or remove CSS class in javaScript instead of changing CSS properties all the time
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            //Use function here to don't repeat yourself (DRY principle)
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    //same as
    //document.querySelector('#score-0').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//get value from dom
//var x = document.querySelector('#score-0').textContent;








/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
