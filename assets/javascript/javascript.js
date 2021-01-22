// Coding Questions
var questions = [{
    question: "What of the following options is used to return the first element within the document that is selected?"
    options: ["addElement( )", "parseInt ( )", "querySelector ( )", "appendChild ( )"
    answer: "querySelector( )"
},
{
    title: "Who created JavaScript?",
    question: ["Brendan Eich( )", "Håkon Wium Lie( )", "Tim Berners-Lee( )", "John Resig( )"],
    answer: "Brendan Eich( )"
},
{
    question: "When counting the indexes in an array, what number do you start with?",
    options: ["3( )", "1( )", "2( )", "0()"],
    answer: "0( )"
},
{
    question: "Which of the following options is a boolean value?",
    options: ["Ok( )", "function( )", "var( )", "false( )"],
    answer: "false( )"
},
{
    question: "Which of the following is a string method?",
    options: ["height( )", "length( )", "console.log( )", "None of the above.( )"],
    answer: "length( )"
}
]

// Score and timer functions

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 5000);

    next();
}

// Function to end game when the timer is done.
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Time's up!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Clears score
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetQuiz();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h2>
        Code Quiz
    </h2>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Time deducted if answer is wrong
function incorrectResponse() {
    timeLeft -= 15; 
    next();
}

//Add 5 points for every answer that is correct
function correctResponse() {
    score += 5;
    next();
}