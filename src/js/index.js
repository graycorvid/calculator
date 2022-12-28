/* eslint-disable */
const bluesThemeBTN = document.querySelector(".color.blues");
const basicThemeBTN = document.querySelector(".color.basic");
const discoThemeBTN = document.querySelector(".color.disco");
const calculatorScreen = document.querySelector(".screen");
const calculatorScreenTXT = document.querySelector(".screen p");
const previousEquationTXT = document.querySelector("span.small-equation");
const numberBTNs = document.querySelectorAll(`[data-number="digit"]`);
const periodBTN = document.querySelector(`[data-sign="dot"]`);
const resultBTN = document.querySelector(`[data-sign="result"]`);
const signBTNs = document.querySelectorAll(`[data-sign="sign"]`);
const clearBTN = document.querySelector(".delete");
let dotFlag = true;
let numberFlag = true;
let resultFlag = false;
let zeroFlag = true;
let finalResult;
let equationNumber = 0;
const digitRegExp = /[0-9]/;
const signsArray = [];
const numbersArray = [];
//THEMES: Each button changes a color theme
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
//Changes default "0" to the clicked number
//
const replaceZeroOnScreen = (currentNumber) => {
  if (
    calculatorScreenTXT.textContent === "0" &&
    digitRegExp.test(currentNumber)
  ) {
    calculatorScreenTXT.textContent = "";
    equationNumber = "";
  } else if (
    calculatorScreenTXT.textContent === "try again" &&
    digitRegExp.test(currentNumber)
  ) {
    calculatorScreenTXT.textContent = "";
    equationNumber = "";
  }
};
//
//gets number from button and puts it to screen
//
const getNumber = (e) => {
  let currentNumber = e.target.textContent;
  replaceZeroOnScreen(currentNumber);
  checkEachNumbersLenght(currentNumber);
  if (numberFlag) {
    equationNumber += currentNumber; //gets full number for equations
  }
  makeNumbersSmaller();
};
//
//Controls the max length of each number
//
const checkEachNumbersLenght = (currentNumber) => {
  if (
    equationNumber.toString().length <= 6 ||
    (equationNumber.toString().length <= 7 && !dotFlag)
  ) {
    calculatorScreenTXT.textContent += currentNumber.trim();
  }
};
//
//allows dots between numbers (with rule that doesn't allow multiple ones in one number)
//
const getDotSign = () => {
  if (equationNumber.toString().length >= 5) {
    dotFlag = false;
  }
  let index = calculatorScreenTXT.textContent.length - 1;
  if (digitRegExp.test(calculatorScreenTXT.textContent[index]) && dotFlag) {
    calculatorScreenTXT.textContent += ".";
    equationNumber += ".";
    dotFlag = false; //turns off
  }
};
//
//Gets the clicked operator sign
//
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
//
//Puts all the operators into an array in order of them being clicked
//
const createSignArrayForResult = (sign) => {
  signsArray.push(sign.textContent);
  return signsArray;
};
//
//Puts all the numbers(equationNumber) into an array in order of them being clicked
//
const createNumberArrayForResult = () => {
  if (equationNumber !== "") {
    numbersArray.push(parseFloat(equationNumber));
    numberFlag = true;
    equationNumber = "";
    return numbersArray;
  }
};
//
//Calculates the result using both arrays
//
const getResult = () => {
  if (resultFlag) {
    let smallEquation = calculatorScreenTXT.textContent;
    calculatorScreenTXT.textContent = "";
    let i = 0;
    createNumberArrayForResult();

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
        if (b === 0) {
          divideByZeroAlert();
          resultFlag = false;
          return "try again";
        } else {
          i++;
          return a / b;
        }
      }
    });

    dotFlag = true;
    numberFlag = true;
    makePreviousEquationSmall(smallEquation);
    checkResult(finalResult);
    cleanTheValues();
    makeNumbersSmaller();
  }
};
//
//Formats the result in terms of it ending with decimals or with zeros
//
const checkResult = (result) => {
  if (result.toString().includes(".00") || result.toString().includes(".0")) {
    calculatorScreenTXT.textContent = finalResult.toFixed();
  } else if (result.toString().includes(".")) {
    calculatorScreenTXT.textContent = finalResult.toFixed(2);
  } else {
    calculatorScreenTXT.textContent = finalResult;
  }
};
const divideByZeroAlert = () => {
  alert("That's a bad idea :)");
};
//
//resetes the calculator values
//
const cleanTheValues = () => {
  signsArray.splice(0);
  numbersArray.splice(0);
  equationNumber = finalResult;
  numberFlag = true;
};
//
//controls numbers font size
//
const makePreviousEquationSmall = (smallEquation) => {
  previousEquationTXT.textContent = "";
  previousEquationTXT.textContent = smallEquation + " =";
};
const makeNumbersSmaller = () => {
  if (calculatorScreenTXT.textContent.length > 10) {
    calculatorScreenTXT.classList.add("small-font-screen");
  } else {
    calculatorScreenTXT.classList.remove("small-font-screen");
  }
};
//
//reset screen to "0"
//
const clear = () => {
  previousEquationTXT.textContent = "";
  calculatorScreenTXT.textContent = "0";
  replaceZeroOnScreen();
  signsArray.splice(0);
  numbersArray.splice(0);
  equationNumber = 0;
  dotFlag = true;
  numberFlag = true;
  resultFlag = false;
  zeroFlag = true;
};
numberBTNs.forEach((button) => {
  button.addEventListener("click", getNumber);
});
signBTNs.forEach((button) => {
  button.addEventListener("click", getMathSign);
});
periodBTN.addEventListener("click", getDotSign);
resultBTN.addEventListener("click", getResult);
clearBTN.addEventListener("click", clear);
bluesThemeBTN.addEventListener("click", changeThemeBlues);
basicThemeBTN.addEventListener("click", changeThemeBasic);
discoThemeBTN.addEventListener("click", changeThemeDisco);

//PO WYNIKU NIE BIERZE LICZBY
