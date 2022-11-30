/* eslint-disable */
const bluesThemeBTN = document.querySelector(".color.blues");
const basicThemeBTN = document.querySelector(".color.basic");
const discoThemeBTN = document.querySelector(".color.disco");
const calculatorScreenTXT = document.querySelector(".screen p");
const numberBTNs = document.querySelectorAll(`[data-number="digit"]`);
const periodBTN = document.querySelector(`[data-sign="dot"]`);
const resultBTN = document.querySelector(`[data-sign="result"]`);
const signBTNs = document.querySelectorAll(`[data-sign="sign"]`);
let dotFlag = true;
let numberFlag = true;
let resultFlag = false;
let finalResult;
let equationNumber = "";
const digitRegExp = /[0-9]/;
const signsArray = [];
const numbersArray = [];
//THEMES:
const changeThemeBlues = () => {
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add("default");
};
const changeThemeBasic = () => {
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add("basic-theme");
};
const changeThemeDisco = () => {
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add("disco-theme");
};
//
//gets number from button and puts it to screen
//
const replaceZeroOnScreen = (currentNumber) => {
  if (
    calculatorScreenTXT.textContent === "0" &&
    digitRegExp.test(currentNumber)
  ) {
    calculatorScreenTXT.textContent = "";
  }
};
const getNumber = (e) => {
  let currentNumber = e.target.textContent;
  replaceZeroOnScreen(currentNumber);
  checkEachNumbersLenght(currentNumber);
  if (numberFlag) {
    equationNumber += currentNumber; //gets full number for equations
  }
  makeNumbersSmaller();
};
const checkEachNumbersLenght = (currentNumber) => {
  if (
    equationNumber.toString().length <= 6 ||
    (equationNumber.toString().length <= 7 && !dotFlag)
  ) {
    calculatorScreenTXT.textContent += currentNumber.trim();
  }
};
//allows dots between numbers
const getDotSign = () => {
  if (equationNumber.length.toString().length >= 5) {
    dotFlag = false;
  }
  let index = calculatorScreenTXT.textContent.length - 1;
  if (digitRegExp.test(calculatorScreenTXT.textContent[index]) && dotFlag) {
    calculatorScreenTXT.textContent += ".";
    equationNumber += ".";
    dotFlag = false; //turns off
  }
};
const getMathSign = (e) => {
  let currentSign = e.target;
  let index = calculatorScreenTXT.textContent.length - 1;
  if (digitRegExp.test(calculatorScreenTXT.textContent[index])) {
    calculatorScreenTXT.textContent += e.target.textContent.trim();
    numberFlag = false;
    dotFlag = true;
    resultFlag = true;
    createSignArrayForResult(currentSign);
    createNumberArrayForResult();
  }
};
// const makeEquationSmall = () => {};
const createSignArrayForResult = (sign) => {
  signsArray.push(sign.textContent);
  return signsArray;
};
const createNumberArrayForResult = () => {
  if (equationNumber !== "") {
    numbersArray.push(parseFloat(equationNumber));
    numberFlag = true;
    equationNumber = "";
    return numbersArray;
  }
};

const getResult = () => {
  createNumberArrayForResult();
  calculatorScreenTXT.textContent = "";
  let i = 0;
  if (true) {
    finalResult = numbersArray.reduce((a, b) => {
      if (signsArray[i] === "+") {
        i++;
        return a + b;
      } else if (signsArray[i] === "-") {
        i++;
        return a - b;
      } else if (signsArray[i] === "x") {
        i++;
        return a * b;
      }
      if (signsArray[i] === "÷") {
        i++;
        return a / b;
      }
    });
  }
  dotFlag = true;
  checkResult(finalResult);
  cleanTheValues();
};
const checkResult = (result) => {
  if (result.toString().includes(".00") || result.toString().includes(".0")) {
    calculatorScreenTXT.textContent = finalResult.toFixed();
  } else if (result.toString().includes(".")) {
    calculatorScreenTXT.textContent = finalResult.toFixed(2);
  } else {
    calculatorScreenTXT.textContent = finalResult;
  }
};
const cleanTheValues = () => {
  signsArray.splice(0);
  numbersArray.splice(0);
  equationNumber = finalResult;
  numberFlag = true;
};
const makeNumbersSmaller = () => {
  if (calculatorScreenTXT.textContent.length > 7) {
    calculatorScreenTXT.classList.add("small-font-screen");
  }
};
numberBTNs.forEach((button) => {
  button.addEventListener("click", getNumber);
});
signBTNs.forEach((button) => {
  button.addEventListener("click", getMathSign);
});
periodBTN.addEventListener("click", getDotSign);
resultBTN.addEventListener("click", getResult);
bluesThemeBTN.addEventListener("click", changeThemeBlues);
basicThemeBTN.addEventListener("click", changeThemeBasic);
discoThemeBTN.addEventListener("click", changeThemeDisco);
