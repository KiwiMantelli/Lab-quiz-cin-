import { questions } from "./dataMovie.js";

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
let qImg = document.getElementById("img-question");
let questionItem = document.getElementById("question");
const allBtns = document.querySelectorAll("#answer-btn .btn");
const scoreDiv = document.getElementById("score");
const refresh = document.getElementById("refresh");
const video = document.querySelector(".video");

let runningQuestionIndex = getRandomIndex();
let tenQuestion = 1;
let score = 0;
console.log("video",video);


function autoPlayVideo() {
  setTimeout(() => {
    video.click()  
  }, 500);
  
}

autoPlayVideo()

// function playVideo() {
//   video.classList.add("playing");
//   video.load();
//   video.play();
//   video.addEventListener(
//     "ended",
//     (evt) => {
//       video.pause();
//       video.currentTime = 0;
//       video.classList.remove("playing");
//       setTimeout(function () {
//         document.body.removeChild(video);
//       }, 2000);
//     },
//     false
//   );
// }

//start the game
function setStart() {
  startBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  questionContainer.classList.remove("hide");
  renderQuestion();
}

//index of question get randomly
function getRandomIndex() {
  return Math.floor(Math.random() * questions.length);
}

//next btn go to next question and set clear status
function setNext() {
  questions.splice(runningQuestionIndex, 1);
  runningQuestionIndex = getRandomIndex();
  renderQuestion();
  clearStatus();
}

//restart btn reset

function setRestart() {
  clearStatus();
  refresh.classList.remove("hide");
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
  let q = questions[runningQuestionIndex];
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  questionItem.innerText = q.question;
  let randomAnswer = randomArray(q.answers);
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
  const currentQuestion = questions[runningQuestionIndex];
  const currentAnswers = currentQuestion.answers;
  const indexCorrectAnswer = currentQuestion.correctIndex;
  const correctAnswer = currentAnswers[indexCorrectAnswer];

  if (selectResponse === correctAnswer) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("wrong");
  }
  endGame();
  disabledBtn();
  nextBtn.style.pointerEvents = "auto";
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
  if (tenQuestion < 5) {
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
  scoreDiv.innerText = "Final score: " + score + "/10";
}
startBtn.addEventListener("click", setStart);

nextBtn.addEventListener("click", setNext);

allBtns.forEach((btn) => {
  btn.addEventListener("click", selectAnswer);
});

refresh.addEventListener("click", (evt) => {
  document.location.reload(false);
});


