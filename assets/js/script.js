//DOM elemets 
var startButtonEl = document.querySelector('#start');
var questionEl = document.querySelector('#question');
var answerEl = document.querySelector('#answers');
var startPageEl =  document.querySelector('#startpage');
var scorePageEl = document.querySelector('#score');
var questionConEl = document.querySelector('#questionsContainer');
var correctEl = document.querySelector('#prompt');
var countdownEl = document.querySelector('#countdown');
var scoreAreaEl = document.querySelector('#scoreArea');
var inNameEl = document.querySelector('#inName');
var buttonDivEl = document.querySelector('#saveButton');
var highScoreEl = document.getElementById('highScores');

//variables 
var timer = 75;
var runningTimer;
var score = 0;
var questionIndex = 0

//questions array
var questions = [
    {question:"String values must be enclosed within _____ when being assigned to variables.",
    answers: [
        {text: "commas", correct:false },
        {text: "culry brackets", correct:false},
        {text: "quotes", correct:false },
        {text: "parenthsis", correct:true }
    ]
    },
    {question:"Array's in JavaScript can be used to store _____.",
    answers: [
        {text: "numbers and strings", correct:false },
        {text: "other array's", correct:false},
        {text: "booleans", correct:false },
        {text: "all of the above", correct:true }
    ]
    },
    {question:"A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
        {text: "JavaScript", correct:false },
        {text: "console.log", correct:true},
        {text: "terminal/bash", correct:false },
        {text: "foor loops", correct:false }
    ]
    },
    {question:"Commonly used data types DO not include:",
    answers: [
        {text: "strings", correct:false },
        {text: "booleans", correct:false},
        {text: "alerts", correct:true },
        {text: "numbers", correct:false }
    ]
    },
    {question:"The condition in an if/else statement is enclosed with ____.",
    answers: [
        {text: "paranthesis", correct:true },
        {text: "curly brackets", correct:false},
        {text: "quotes", correct:false },
        {text: "square brackets", correct:false }
    ]
    }
];

// make answer text into a buttons  
function answerButton (answer) {
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute('answer', answer.correct);
    buttonEl.setAttribute('class' , 'answer-button' )
    buttonEl.id = answer.text;
    buttonEl.innerText = answer.text;
  
    //eveny listern for going to next question once the answer of a button is clicked
    buttonEl.addEventListener("click", nextQuestion);
    
    answerEl.appendChild(buttonEl);
}

//deletes the answer buttons so next answers can be displayed
function deleteButton (){
    //loops through the answers array and deletes button
    for (var i = 0; i< questions[questionIndex].answers.length; i++) {
        var buttonId = document.getElementById(questions[questionIndex].answers[i].text);
        buttonId.remove(); 
    }  
    
}

//adjusting time and points based on if answer is correct or wrong 
//var correctInc = function (answer){}
function correctInc (answer) {
    createText(answer);
    if (answer === "true"){
        score += 5;
    } else {
        timer -= 10;
    }
}

//function for creating a text for correct and wrong answer's
//var createText = function(answer){}
function createText(answer) {
    if (answer === "true") {
        correctEl.innerHTML = "Correct!"
    } else {
        correctEl.innerHTML = "Wrong!"
    }
}

// timer function starts at 75 seconds
//var startTimer = function ()
function startTimer() {
    countdownEl.innerHTML = "Time:" + timer;
    if (timer <= 0) {
        gameOver();
    } else {
        timer -= 1;
        runningTimer = setTimeout(startTimer, 1000);
    }

}


// gets items from local storage and load them
//var loadSavedScores = function (){}
function loadSavedScores() {

    var currentleaderboard = JSON.parse(localStorage.getItem("leaderboard"));
   

    //loop through the leaderboard create new DOM elements
    for (var i = 0; i<currentleaderboard.length; i++) {
        var p = document.createElement("p")
        p.setAttribute("class", "user-score")
        p.innerHTML = currentleaderboard[i].initails + " - " + currentleaderboard[i].score;
        highScoreEl.appendChild(p);
    }

   
}   

function viewHighScores() { 
    scorePageEl.replaceWith(highScoreEl);
    loadSavedScores();
}
  
  
//save name and initail to local stroage 
// var saveScoresLocalstorage = function (){}
function saveScoresLocalStorage(e) {
    e.preventDefault();
    var name = document.querySelector("#initails-input").value;
    var userScore = {initails: name , score};
    // get the current local storage array
    var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    // push userscore variables into leaderboard array 
    leaderboard.push(userScore);
    //setting back to array and local storage item
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    viewHighScores();
}

// once all questions have been answered give me a final score 
//var displayScore = function () {}
function displayScore() {
    questionConEl.replaceWith(scorePageEl);
    scoreAreaEl.innerText = "Final Score: " + score;
     // Create an input element for initials 
    initTextEl = document.createElement("input"); 
    initTextEl.setAttribute("id", "initails-input"); 
    initTextEl.setAttribute("class","initails-input");
    initTextEl.setAttribute("type", "text"); 
    initTextEl.setAttribute("name", "iniatials"); 
    initTextEl.setAttribute("placeholder", "Enter Initials here"); 
      
    inNameEl.appendChild(initTextEl);


    // create save button elemetn
    saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("id" , "save-btn");
    saveButtonEl.setAttribute("class" ,"save-btn");
    saveButtonEl.setAttribute("type" , "submit");
    saveButtonEl.textContent = "Save Score";

    inNameEl.appendChild(saveButtonEl);
  

    inNameEl.addEventListener("submit", saveScoresLocalStorage);
    
}


//function to save task in local storage 
var savedScore = function() {
    localStorage.setItem("score", JSON.stringify(score));
}
var savedInit = function(initails) {
    localStorage.setItem("initails", JSON.stringify(initails));
}
//show questions 
// var showQAs = function (){}
function showQAs (){
    questionEl.innerHTML=questions[questionIndex].question
   // loop for answers in questions
    //answerEl.innerHTML = "<ol>";
    
    for (var i = 0; i< questions[questionIndex].answers.length; i++) {
       answerButton(questions[questionIndex].answers[i]); 
    }    

    //answerEl.innerHTML += "</ol>";
}

// game over function
//var gameOver = function (){}
function gameOver() {
    clearInterval(runningTimer);
    countdownEl.innerHTML = "Finished";
    displayScore();
    //savedScore ();
}

//looping through questionIndex
//var nextQuestion = function (){}
function nextQuestion (event) {
    console.log(nextQuestion);
    var targetEl = event.target;
    
    correctInc(targetEl.getAttribute('answer'));

    deleteButton();
    questionIndex++;
    if (questionIndex < questions.length) {
        showQAs();
    } else {
        gameOver();
    }
}

// start quiz on click  
//ar startQuiz = fucntion () {
    
function startQuiz() {
    startPageEl.replaceWith(questionConEl)
    startTimer();
    showQAs();
}


//event listeners
startButtonEl.addEventListener("click", startQuiz);
