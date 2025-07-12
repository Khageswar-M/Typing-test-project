const inputField = document.getElementById("test");
const words = document.getElementById("words");

const originalText = words.textContent;

const wordToCharacter = words.textContent.split("");

words.textContent = "";
wordToCharacter.forEach((ch)=>{
    words.innerHTML += `<span>${ch}</span>`;
});

let correctCount = 0;
let incorrectCount = 0;
let correctnessArray = [];
let prevLength = 0;

function check(inputField){
    let currLength = inputField.value.length;

    //When typing new character
    if(currLength > prevLength){
        let index = currLength - 1;
        prevLength = Math.max(prevLength, currLength);
        let inputChar = inputField.value.charAt(index);
        let originalChar = originalText.charAt(index);

        let span = words.children[index];

        if(inputChar === originalChar){
            correctCount++;
            correctnessArray[index] = true;
            if(span){
                span.classList.add("correct");
                span.classList.remove("incorrect");
            }
        }else{
            correctnessArray[index] = false;
            incorrectCount++;
            if(span){
                span.classList.add("incorrect");
                span.classList.remove("correct");
            }
        }
    }
    //When make delete in the input
    else if(currLength < prevLength){
        let index = currLength;
        let span = words.children[index];

        if(correctnessArray[index] == true){
            correctCount--;
        }else if(correctnessArray[index] === false){
            incorrectCount--;
        }
        //Remove classes when deleting
        if(span){
            span.classList.remove("correct", "incorrect");
        }

        // it will remove the last correctness entry
        correctnessArray.splice(index, 1);
        // console.log(`ok : ${correctnessArray.splice(index, 1)}`);
    }
    prevLength = currLength;


    console.log(`correct: ${correctCount} & incorrect: ${incorrectCount} currentChar: ${originalText.charAt(correctCount + incorrectCount - 1)}`);
}
inputField.addEventListener("input", () => {
    let allCount = correctCount + incorrectCount;
    let originalLength = originalText.length;
    if(allCount !== originalLength){
        check(inputField);
    }else{
        console.log("over");
    }
});