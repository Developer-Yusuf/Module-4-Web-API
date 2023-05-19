const problem = document.getElementById("problem");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentproblem = {};
let acceptingAnswers = false;
let score = 0;
let counter = 0;
let availableproblems = [];
let timeEl = document.getElementById("time");


let problems = [
 
  {
    problem: "What is the correct syntax to declare a variable in Python?",
    choice1: "variable x;",
    choice2: "x = 5",
    choice3: "int x",
    choice4: "declare x = 5",
    answer: "2"
  },{
    problem: "Which data structure uses a Last-In-First-Out (LIFO) approach?",
    choice1: "Queue",
    choice2: "Stack",
    choice3: "Heap",
    choice4: "Linked List",
    answer: "2",
  },{
    problem: "What is the result of the following expression in JavaScript: '5' + 2?",
    choice1: "52",
    choice2: "7",
    choice3: "22",
    choice4: "Error",
    answer: "1",
  },{
    problem: "Which keyword is used to define a function in C++?",
    choice1: "function",
    choice2: "method",
    choice3: "def",
    choice4: "void",
    answer: "4",
  },{
    problem: "What is the file extension for a Python source code file?",
    choice1: ".py",
    choice2: ".java",
    choice3: ".txt",
    choice4: ".exe",
    answer: "1",
  }
 

];

const C_Answer = 20;
const MAX_problemS = 5;


startGame = () => {
  counter = 0;
  score = 0;
  availableproblems = [...problems];
  getNewproblem();
};

let secondsLeft = 60;

//time factor
function setTime() {
  
  let T_interval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution 
      clearInterval(T_interval);
      return window.location.assign("./endgame.html");
    }
  }, 1000);
}

setTime();

getNewproblem = () => {
  //Quit when quiz over
  if (availableproblems.length === 0 || counter > MAX_problemS) {
    localStorage.setItem('mostRecentScore', score)


    //Game over,redirect to Result
    return window.location.assign("./endgame.html");

  }
  counter++;
  progressText.innerText = `problem ${counter}/${MAX_problemS}`;
  //Update bar
  progressBarFull.style.width = `${(counter / MAX_problemS) * 100}%`;

  const problemIndex = Math.floor(Math.random() * availableproblems.length);
  currentproblem = availableproblems[problemIndex];
  problem.innerText = currentproblem.problem;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentproblem["choice" + number];
  });

  //splice will make answered problems not repeat//
  availableproblems.splice(problemIndex, 1);

  acceptingAnswers = true;
};

//on click choice
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentproblem.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(C_Answer);
    } else {
      secondsLeft -= 5;
    }
    
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewproblem();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();