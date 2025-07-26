const Words = [
  "apple", "water", "sun", "code", "drive", "mouse", "hello", "world",
  "brain", "cloud", "sky", "green", "blue", "quick", "smart", "light",
  "dark", "wind", "stone", "river", "earth", "happy", "plant", "learn",
  "teach", "build", "play", "read", "write", "sound", "clear", "space",
  "clock", "timer", "phone", "laugh", "think", "dream", "sleep", "walk",
  "run", "jump", "talk", "listen", "touch", "stand", "sit", "open",
  "close", "carry", "bring", "catch", "throw", "build", "break", "start",
  "stop", "push", "pull", "lift", "drop", "hold", "leave", "enter", "exit",
  "watch", "show", "hide", "seek", "share", "smile", "trust", "prove",
  "clear", "focus", "plan", "go", "yes", "no", "why", "try", "win", "fail",
  "hope", "save", "load", "find", "love", "hate", "care", "grow", "aim",
  "rest", "rise", "burn", "melt", "cool", "heat", "roam", "stay", "live",
  "gone", "fast", "slow", "kind", "mean", "bold", "neat", "calm", "loud",
  "quiet", "young", "older", "sweet", "bitter", "fun", "sad", "joy", "true",
  "false", "start", "begin", "peace", "fight", "game", "level", "score",
  "title", "write", "input", "output", "value", "logic", "token", "debug",
  "check", "class", "field", "event", "array", "string", "object", "while",
  "return", "import", "export", "module", "public", "static", "method",
  "button", "submit", "select", "option", "update", "delete", "insert",
  "server", "client", "admin", "author", "user", "login", "logout", "route",
  "query", "index", "main", "merge", "branch", "fetch", "pull", "push",
  "commit", "remote", "clone", "reset", "revert", "build", "test", "deploy",
  "ready", "clean", "cache", "setup", "tools", "debug", "theme", "style",
  "color", "shade", "border", "radius", "width", "height", "align", "flex",
  "grid", "gap", "wrap", "code", "html", "css", "react", "node", "express",
  "route", "path", "auth", "jwt", "api", "rest", "json", "data", "model",
  "schema", "mysql", "mongo", "query", "sql", "join", "group", "count",
  "limit", "order", "asc", "desc", "map", "loop", "each", "call", "bind",
  "apply", "scope", "this", "that", "then", "else", "case", "true", "false",
  "const", "let", "var", "zero", "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten", "math", "calc", "eval", "sum",
  "diff", "avg", "max", "min", "even", "odd", "prime", "fact", "mod", "pow",
  "sqrt", "log", "round", "floor", "ceil", "abs", "type", "check", "match",
  "regex", "test", "pass", "fail", "run", "skip", "mark", "todo", "note",
  "warn", "error", "info", "msg", "text", "line", "file", "path", "link",
  "href", "host", "port", "site", "page", "view", "load", "save", "edit",
  "form", "grid", "flex", "item", "list", "menu", "nav", "head", "body",
  "foot", "main", "aside", "span", "div", "wrap", "box", "img", "icon",
  "font", "bold", "thin", "size", "line", "pad", "mar", "top", "left",
  "right", "down", "back", "next", "prev", "up", "all", "any", "some"
];


let originalText = "";
let charSpans = [];
const textSection = document.querySelector(".text-section");
const wordLengthInput = document.getElementById("wordLength");
const inputField = document.getElementById("test");
const startBtn = document.getElementById("start");
const range = document.querySelector(".range");

const timmer = document.querySelector(".time");
const wpm = document.querySelector(".wpms");
const accuracy = document.querySelector(".accuracies");
const test = document.querySelector(".testCount");

const errorHandler = document.getElementById("warningHandler");
const errorMessage = document.querySelector(".errorText");
const cancelHandler = document.getElementById("cancel");
const start = document.getElementById("start");

let testCount = 0;
test.innerHTML = testCount;



const handleBackspace = (e) => {
  if (e.key === 'Backspace') {
    e.preventDefault();
  }
};

let tabFocused = false;
document.addEventListener("keydown", (event) => {


  //Check wheather the input filed is focused or not
  if(inputField != document.activeElement){
    errorMessage.textContent = "Press Enter to focus";
    if(errorHandler.style.display === "none"){
      errorHandler.style.display = "flex";
    }
  }

  const isStartFocused = document.activeElement === start;
  if (event.key === 'ArrowDown') {
    textSection.scrollTo({
      top: textSection.scrollTop + textSection.clientHeight * 0.4,
      behavior: "smooth"
    });
  }
  if (event.key === 'ArrowUp') {
    textSection.scrollTo({
      top: textSection.scrollTop - textSection.clientHeight * 0.4,
      behavior: "smooth"
    });
  }


  if (event.key === 'Enter') {

    if (isStartFocused) {
      errorHandler.style.display = "none";
      inputField.focus();
      start.click();
      stopTimmer();
      return;
    }


    errorHandler.style.display = "none";
    // start.click();
    inputField.focus();

  }

  if (event.key === 'Tab') {
    event.preventDefault();
    // stopTimmer();
    tabFocused = true;
    start.focus();
  }
});

cancelHandler.addEventListener("click" , () => {
  errorHandler.style.display = "none";
});

let correctCount = 0;
let incorrectCount = 0;
let totalLength = 0;
let currentIndex = 0;

let countWords = 0;

let allWords = 0;




function getWords() {
  try {
    errorMessage.innerHTML = "Press Enter to focus";
    if (errorHandler.style.display != "none") {
      errorHandler.style.display = "flex";
      
    }

    timmer.textContent = "00:00";
    wpm.textContent = "0";
    accuracy.textContent = "0%";
    range.style.width = "0%";

    const len = wordLengthInput.value || 10;
    if (len < 1 || len > 1000) {
      errorMessage.innerHTML = "Words must be 1 to 1000";
      errorHandler.style.display = "flex";
      return;
    }
    let sentence = "";
    for (let i = 0; i < len; i++) {
      const index = Math.floor(Math.random() * 342);
      sentence += Words[index] + " ";
    }
    originalText = sentence;
    renderCharacters(originalText.split(""));
    inputField.value = "";

    // Reset state
    correctCount = 0;
    incorrectCount = 0;
    prevLength = 0;
    correctnessArray = [];
  } catch (error) {
    errorMessage.textContent = `${error}`;
    errorHandler.style.display = "flex";
  }
}
getWords();



function renderCharacters(chars) {
  // stopTimmer();
  totalLength = chars.length;
  // const textSection = document.querySelector(".text-section");
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
  if (currLength === 1) {
    startTimmer();
  } else if (currLength === 0) {
    stopTimmer();
  }

  if (currLength > prevLength) {
    const index = currLength - 1;
    prevLength = currLength;
    const inputChar = inputField.value.charAt(index);
    const originalChar = originalText.charAt(index);
    const span = charSpans[index];



    if (inputChar === originalChar) {

      currentIndex = index;
      updateActiveSpan();
      correctCount++;
      correctnessArray[index] = true;
      if (span) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      }
    } else {
      currentIndex = index;
      updateActiveSpan();
      incorrectCount++;
      correctnessArray[index] = false;
      if (span) {
        span.classList.add("incorrect");
        span.classList.remove("correct");
      }
    }
  } else if (currLength < prevLength) {
    const index = currLength;
    const span = charSpans[index];
    currentIndex = index;
    updateActiveSpan();

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

}


inputField.addEventListener("input", () => {
  // Prevent multiple consecutive spaces
  inputField.value = inputField.value.replace(/ {2,}/g, " ");
  const lastChar = inputField.value.charAt(inputField.value.length - 1); // ✅ FIXED

  if (lastChar === " ") {
    document.addEventListener("keydown", handleBackspace); // ✅ Only if not already added (optional improvement)
  } else {
    document.removeEventListener("keydown", handleBackspace);
  }

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
  } else if (totalTyped <= totalLength - 2) {
    check(inputField);
    stopTimmer();
    result();
    test.innerHTML = ++testCount;
  } else {
    stopTimmer();
    result();
  }
});

//TIMMER

let startTime = 0;
let elapseTime = 0;
let interval = 0;
let isRunning = false;

function updateTime() {

  let time = elapseTime;
  let hrs = Math.floor(time / 3600000);
  let min = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  timmer.textContent = `
    ${min.toString().padStart(2, 0)}:${secs.toString().padStart(2, 0)}
  `;
}

function startTimmer() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapseTime;
  interval = setInterval(() => {
    elapseTime = Date.now() - startTime;
    updateTime();
  }, 1000);
}

function stopTimmer() {
  clearInterval(interval);
  startTime = 0;
  elapseTime = 0;
  interval = 0;
  isRunning = false;
}

let myWpm = 0;
let acc = 0;
function displayWpmAccuracy() {

  //for wpm
  const t = timmer.textContent.split(":");
  const min = ((Number(t[0]) * 60) + Number(t[1])) / 60;

  const safeMin = min === 0 ? 0.01 : min;
  myWpm = correctCount / (5 * safeMin);

  //for accuracy
  const totalCharLengths = correctCount + incorrectCount;
  acc = Math.round(((correctCount / totalCharLengths) * 100));
  const myAccuracy = `${acc}%`;

  wpm.textContent = myWpm.toFixed(0);
  accuracy.textContent = myAccuracy;

}

function ranging() {


  const maxWpm = 100;
  const wmpScore = Math.min(myWpm, maxWpm) / 100;
  const accuracyScore = acc / 100;
  const performanceScore = (wmpScore * 0.6 + accuracyScore * 0.4) * 100;


  const performance = Math.round(performanceScore);
  range.style.width = `${performance}%`;
}

function updateActiveSpan() {
  const prev = document.querySelector("span.active");
  if (prev) prev.classList.remove("active");

  const spans = document.querySelectorAll(".text-section span");
  const nextSpan = spans[currentIndex];
  if (nextSpan) {
    nextSpan.classList.add("active");
    console.log(`trigger in updateActiveSpan()`);
    scrollToActiveChar();
  }
}

function scrollToActiveChar() {
  const container = textSection;
  const activeSpan = container.querySelector("span.active");

  if (!activeSpan) return;

const spanTop = activeSpan.offsetTop;
let spanBottom = spanTop + activeSpan.offsetHeight;

  const containerTop = container.scrollTop;
  const containerHeight = container.clientHeight;
  const containerBottom = containerTop + containerHeight;
console.log(`${spanBottom} ${containerBottom - containerHeight * 0.01}`);
  if (spanBottom > containerBottom - containerHeight * 0.1) {
    container.scrollTo({
      top: spanTop - containerHeight * 0.3,
      behavior: "smooth"
    });
    spanBottom += 80;
    console.log(`active here`);
  }
}

//RESULT
function result() {
  stopTimmer();
  inputField.blur();
  displayWpmAccuracy();
  ranging();
  startBtn.innerHTML = "Test Again";

}