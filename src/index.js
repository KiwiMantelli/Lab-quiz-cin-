import { questions } from "./dataMovie.js";
let filteredQuestions;
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restart = document.getElementById("restart-btn");
const allBtns = document.querySelectorAll("#answer-btn .btn");
const questionContainer = document.getElementById("question-container");
let imgQuestion = document.getElementById("img-question");
let questionItem = document.getElementById("question");
const scoreDiv = document.getElementById("score");

const vid = document.querySelector(".video");
const divContainer = document.querySelector(".container");
const levelBtns = document.querySelector("#container-level");
const allLevelBtns = document.querySelectorAll("#container-level .btn");
const normalQuestions = questions.filter(
  (element) => element.level === "normal"
);
let runningQuestionIndex = getRandomIndex(normalQuestions);
let tenQuestion = 1;
let score = 0;

function setVideo() {
  divContainer.classList.remove("hide");
  vid.classList.add("anim-fade-out");
  vid.classList.add("hide");
}
setTimeout(setVideo, 12000);

//start the game
function setStart() {
  startBtn.classList.add("hide");
  levelBtns.classList.remove("hide");
  var audio = new Audio("./styles/soundtrackJP.mp3");
  audio.play();
}

// choice of level question
function levelChoice(evt) {
  const currentLevel = evt.target.textContent.toLowerCase();
  filteredQuestions = questions.filter(
    (element) => currentLevel === element.level
  );
  nextBtn.addEventListener("click", setNext);

  console.log("---", filteredQuestions);
  questionContainer.classList.remove("hide");
  renderQuestion();
  levelBtns.classList.add("hide");
  nextBtn.classList.remove("hide");
}

//index of question get randomly
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

//next btn go to next question and set clear status
function setNext() {
  filteredQuestions.splice(runningQuestionIndex, 1);
  runningQuestionIndex = getRandomIndex(filteredQuestions);
  renderQuestion();
  clearStatus();

}



//restart btn reset

function setRestart() {
  clearStatus();
  scoreDiv.classList.add("hide");
  restart.classList.remove("hide");
}

//to get answer randomly place in the button
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(array) {
  let newArray = [];
  while (newArray.length != array.length) {
    let rIndex = getRndInteger(0, array.length - 1);
    let response = array[rIndex];
    if (!newArray.includes(response)) newArray.push(response);
  }
  return newArray;
}

// render Question and answer
function renderQuestion() {
  const allBtns = document.querySelectorAll("#answer-btn .btn");
  let questionTrack = filteredQuestions[runningQuestionIndex];
  imgQuestion.innerHTML = "<img src=" + questionTrack.imgSrc + ">";
  questionItem.innerText = questionTrack.question;
  let randomAnswer = randomArray(questionTrack.answers);
  randomAnswer.forEach((answer, i) => {
    allBtns[i].innerText = answer;
  });
  
 

}

//after select answer others answers are unclickable
function disabledBtn() {
  allBtns.forEach((btn) => {
    btn.style.pointerEvents = "none";
  });
}

//select an answer correct or wrong, make others answers disables and next clickable
function selectAnswer(evt) {
  const selectBtn = evt.target;
  const selectResponse = evt.target.textContent;
  const currentQuestion = filteredQuestions[runningQuestionIndex];
  const currentAnswers = currentQuestion.answers;
  const indexCorrectAnswer = currentQuestion.correctIndex;
  const correctAnswer = currentAnswers[indexCorrectAnswer];

  if (selectResponse === correctAnswer) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("wrong");
  }

  disabledBtn();
  nextBtn.style.pointerEvents = "auto";
  endGame();
}

// clear btn status for next question
function clearStatus() {
  nextBtn.style.pointerEvents = "none";
  allBtns.forEach((btn) => {
    btn.style.pointerEvents = "auto";
    btn.classList.remove("correct");
    btn.classList.remove("wrong");
  });
}

function endGame() {
  console.log(tenQuestion);
  if (tenQuestion < 6) {
    console.log("test end Game");
    tenQuestion++;
  } else {
    console.log("test score display");
    questionContainer.classList.add("hide");
    nextBtn.classList.add("hide");
    scoreRender();
    setRestart();
  }
}

function scoreRender() {
  scoreDiv.classList.remove("hide");
  let quotesScore = (score <= 3) ? "Try again": (score <=5) ? "Not too bad" : "Stop to watch movie and go out";

  scoreDiv.innerHTML +="Final score: " + score + "/10" + "<br/>" +quotesScore;

 
}

startBtn.addEventListener("click", setStart);

allBtns.forEach((btn) => {
  btn.addEventListener("click", selectAnswer);
});

restart.addEventListener("click", (evt) => {
  document.location.reload(false);
});

allLevelBtns.forEach((btn) => {
  btn.addEventListener("click", levelChoice);
});
