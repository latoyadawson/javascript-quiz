//DOM elemets 
var startButtonEl = document.querySelector('#start');
var questionEl = document.querySelector('#question');
var answerEl = document.querySelector('#answers');
var startPageEl =  document.querySelector('#startpage');
var questionConEl = document.querySelector('#questionsContainer');
var correctEl = document.querySelector('#prompt')
var countdownEl = document.querySelector('#countdown');

//variables 
var timer = 75;
var runningTimer;
var score = 0;
var intials = "";
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

// start quiz on click  
function startQuiz() {
    startPageEl.replaceWith(questionConEl)
    startTimer();
    showQAs();
}

//show questions 
function showQAs (){
    questionEl.innerHTML=questions[questionIndex].question
   // loop for answers in questions
    //answerEl.innerHTML = "<ol>";
    
    for (var i = 0; i< questions[questionIndex].answers.length; i++) {
       answerButton(questions[questionIndex].answers[i]); 
    }    

    //answerEl.innerHTML += "</ol>";
}

// make answers into a buton  
function answerButton (answer) {
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute('answer', answer.correct);
    buttonEl.id = answer.text;
    buttonEl.innerText = answer.text;
  
    buttonEl.addEventListener("click", nextQuestion);

    answerEl.appendChild(buttonEl);
 
}


//looping through questionIndex
function nextQuestion (event) {
    console.log(nextQuestion);
    var targetEl = event.target;
    
    correctInc(targetEl.getAttribute('answer'));

    deleteButton();
    questionIndex++;
    showQAs();

    
}

function deleteButton (){
    //loops through the answers array and deletes button
    for (var i = 0; i< questions[questionIndex].answers.length; i++) {
        var buttonId = document.getElementById(questions[questionIndex].answers[i].text);
        buttonId.remove(); 
    }  
    

}

//prompt for if question is correct 
function correctInc (answer) {
    createText(answer);
    if (answer === true){
        score += 5;
    } else {
        timer -= 10;
    }
}


//function for creating a text for correct and wrong answer's
function createText(answer) {
    if (answer === "true") {
        correctEl.innerHTML = "Correct!"
    } else {
        correctEl.innerHTML = "Wrong!"
    }
}




// timer function starts at 75 seconds
function startTimer() {
    countdown.innerHTML = "Time:" + timer;
    if (timer <= 0) {
        console.log("over");
    } else {
        timer -= 1;
        runningTimer = setTimeout(startTimer, 2000);
    }

}
// game over function

function gameOver() {
    clearInterval(runningTimer);
    countdown.innerHTML = "Finished";
    startButtonEl.innerText = "Restart";
    timer = 75;
    score = 0;
      
}

   
// for every wrong answer take away ten seconds 


//for every correct answer save 5 points 





// on click of a li answer, go to the next questions 


// once all questions have been answered give me a final score 


//allow me to put in my intials to save my final score 

startButtonEl.addEventListener("click", startQuiz);





