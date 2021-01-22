//Coding questions    
var questions = [{
    title: "What of the following options is used to return the first element within the document that is selected?",
    choices: ["addElement( )", "parseInt ( )", "querySelector ( )", "appendChild ( )"],
    answer: "querySelector( )"
},
{
    title: "Who created JavaScript?",
    choices: ["Brendan Eich( )", "Håkon Wium Lie( )", "Tim Berners-Lee( )", "John Resig( )"],
    answer: "Brendan Eich( )"
},
{
    title: "When counting the indexes in an array, what number do you start with?",
    choices: ["3( )", "1( )", "2( )", "0()"],
    answer: "0( )"
},
{
    title: "Which of the following options is a boolean value?",
    choices: ["Ok( )", "function( )", "var( )", "false( )"],
    answer: "false( )"
},
{
    title: "Which of the following is a string method?",
    choices: ["height( )", "length( )", "console.log( )", "None of the above.( )"],
    answer: "length( )"
}
]

//Score & timer values
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Timer initiation after clicking start button
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
}, 1000);

next();
}

//stops the timer to end game
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /5!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="Add your initials here!"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//adds on to local storage
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

//clears score
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
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
<h1>
     - Code Quiz -
</h1>
<h3>
    Click to the button below to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deducts 5 seconds for every incorrect response
function incorrect() {
timeLeft -= 5; 
next();
}

//adds 5 points to each correct answer
function correct() {
score += 5;
next();
}

//Series of questions asked 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}