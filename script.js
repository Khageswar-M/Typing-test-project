let originalText = "";
let charSpans = [];
const wordLengthInput = document.getElementById("wordLength");
const words = document.getElementById("words");
const countCorrect = document.getElementById("correctCount");
const countIncorrect = document.getElementById("incorrectCount");
const inputField = document.getElementById("test");

document.addEventListener("keydown", (event)=>{
    inputField.focus();
});

let correctCount = 0;
let incorrectCount = 0;

words.style.fontSize = "2rem";
words.style.fontFamily = "monospace";

async function getWords() {
  try {
    const len = wordLengthInput.value || 10;
    const apiUrl = `https://random-word-api.vercel.app/api?words=${len}`;
    const getData = await fetch(apiUrl);
    const datas = await getData.json();

    document.getElementById(
      "currLength"
    ).textContent = `Current length: ${datas.length}`;
    originalText = datas.join(" ") + " ";
    console.log(originalText);
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
  const fragment = document.createDocumentFragment();
  charSpans = [];

  chars.forEach((ch) => {
    const span = document.createElement("span");
    span.textContent = ch;
    fragment.appendChild(span);
    charSpans.push(span);
  });

  words.innerHTML = "";
  words.appendChild(fragment);
}

function check(inputField) {
  const currLength = inputField.value.length;

  if (currLength > prevLength) {
    const index = currLength - 1;
    prevLength = currLength;

    const inputChar = inputField.value.charAt(index);
    const originalChar = originalText.charAt(index);
    const span = charSpans[index];

    if (inputChar === originalChar) {
      correctCount++;
      correctnessArray[index] = true;
      if (span) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      }
    } else {
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
  countCorrect.textContent = `Correct: ${correctCount}`;
  countIncorrect.textContent = `In-correct: ${incorrectCount}`;
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
  if (totalTyped < originalText.length) {
    check(inputField);
  } else {
    console.log("Typing test finished.");
  }
});
