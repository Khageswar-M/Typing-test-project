let originalText = "";
let charSpans = [];
const wordLengthInput = document.getElementById("wordLength");
const inputField = document.getElementById("test");
const wordsCount = document.querySelector(".wordsC");



document.addEventListener("keydown", (event)=>{
    if(event.key === 'Enter'){
      inputField.focus();
      startTimmer();
    };
    if(event.key === 'Backspace' || event.key === 'Delete' || event.key.startsWith("Arrow")){
      event.preventDefault();
    }
});
 
let correctCount = 0;
let incorrectCount = 0;
let countWords = 0;

let allWords = 0;
let totalLength = 0;


// words.classList.add("word");

getWords();
async function getWords() {
  try {
    const len = wordLengthInput.value || 10;
    const apiUrl = `https://random-word-api.vercel.app/api?words=${len}`;
    const getData = await fetch(apiUrl);
    const datas = await getData.json();
    allWords = datas.length;
    originalText = datas.join(" ") + " ";
    renderCharacters(originalText.split(""));
    inputField.value = "";

    // Reset state
    correctCount = 0;
    incorrectCount = 0;
    prevLength = 0;
    correctnessArray = [];
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
function renderCharacters(chars) {
  totalLength = chars.length;
  const textSection = document.querySelector(".text-section");
  charSpans = [];

  textSection.innerHTML = "";
  chars.forEach((ch) => {
    const span = document.createElement("span");
    span.textContent = ch;
    textSection.appendChild(span);
    charSpans.push(span);
  });

}

let stack = [];

function check(inputField) {
  const currLength = inputField.value.length;

  if (currLength > prevLength) {
    const index = currLength - 1;
    prevLength = currLength;

    const inputChar = inputField.value.charAt(index);
    const originalChar = originalText.charAt(index);
    const span = charSpans[index];

    if (inputChar === originalChar) {
      // if(inputChar === " " || index === totalLength){
      //   stack.push(incorrectCount);
      //   if(stack.length === 1 && stack[stack.length - 1] === 0){
      //     countWords++;
      //   }else if(stack.length > 1 && stack[stack.length - 1] === stack[stack.length - 2]){
      //     countWords++;
      //   }
      // }
      correctCount++;
      correctnessArray[index] = true;
      if (span) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      }
      checkWords(inputChar, index);
    } else {
      incorrectCount++;
      // stack.push(incorrectCount);
      correctnessArray[index] = false;
      if (span) {
        span.classList.add("incorrect");
        span.classList.remove("correct");
      }
    }
  } else if (currLength < prevLength) {
    const index = currLength;
    const span = charSpans[index];

    if (correctnessArray[index] === true) {
      correctCount--;
    } else if (correctnessArray[index] === false) {
      incorrectCount--;
    }

    if (span) {
      span.classList.remove("correct", "incorrect");
    }

    correctnessArray.splice(index, 1);
    prevLength = currLength;
  }

  wordsCount.textContent = `${countWords}/${allWords}`;
}

inputField.addEventListener("input", () => {
  // Prevent multiple consecutive spaces
  inputField.value = inputField.value.replace(/ {2,}/g, " ");

  // Only allow typing at the end
  if (inputField.selectionStart !== inputField.value.length) {
    inputField.setSelectionRange(
      inputField.value.length,
      inputField.value.length
    );
  }


  const totalTyped = correctCount + incorrectCount;
  if (totalTyped < totalLength - 2) {
    check(inputField);
  }else if(totalTyped <= totalLength - 2){

    if(stack.length > 1 && stack[stack.length - 1] === stack[stack.length - 2]){
      countWords++;
    }

    check(inputField);
    result();
    console.log("finished")
  }else {
    result();
  }
});
function result(){
  stopTimmer();
  inputField.blur();
}
function checkWords(inputChar, index){
  if(inputChar === " " || index === totalLength){
    stack.push(incorrectCount);
    if(stack.length === 1 && stack[stack.length - 1] === 0){
      countWords++;
    }else if(stack.length > 1 && stack[stack.length - 1] === stack[stack.length - 2]){
      countWords++;
    }
  }
}


//TIMMER
const timmer = document.querySelector(".time");
let startTime = 0;
let elapseTime = 0;
let interval = 0;
let isRunning = false;

function updateTime(){

  let time = elapseTime;
  let hrs = Math.floor(time / 3600000);
  let min = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  timmer.textContent = `
    ${min.toString().padStart(2, 0)}:${secs.toString().padStart(2, 0)}
  `;

}
function startTimmer(){
  if(isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapseTime;
  interval = setInterval(() =>{
    elapseTime = Date.now() - startTime;
    updateTime();
  }, 1000);
}
function stopTimmer(){
  clearInterval(interval);
  isRunning = false;
}

//WPM
const wpm = document.querySelector(".wpm");
function wpmIs(){

}