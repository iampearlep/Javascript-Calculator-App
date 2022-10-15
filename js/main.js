const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
const del = document.querySelector(`.del`);

let dis1Num = "";
let dis2Num = "";
let result = null;
let resultOne = null;
let lastOperation = "";
let haveDot = false;
let dis2NumCon = null;
let isContinue = false;
let resultTemp = null;
let dis1NumTemp = null;
let resultTempCon = null;

numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    dis2NumCon = dis2Num;
    display2El.innerText = dis2Num;
  });
});

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    isContinue = false;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      resultOne = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  if (dis1Num == dis1NumTemp && isContinue) {
    dis1Num = resultTempCon + " " + lastOperation + " " + dis2NumCon;
  } else {
    dis1Num += dis2Num + " " + name + " ";
  }

  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = result;
}

function mathOperation() {
  if (isContinue) {
    resultOne = resultTemp;
    dis2Num = dis2NumCon;
  }

  if (lastOperation === "x") {
    result = parseFloat(resultOne) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(resultOne) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(resultOne) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(resultOne) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(resultOne) % parseFloat(dis2Num);
  }

  resultTempCon = resultOne;
}

// operation();

equalEl.addEventListener("click", () => {
  if (isContinue) dis1Num = dis1NumTemp;
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  isContinue = true;
  if (resultOne == 1) isContinue = false;
  clearVar();
  resultTemp = result;
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  if (!dis1NumTemp) dis1NumTemp = dis1Num;
  dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1El.innerText = "";
  display2El.innerText = "";
  result = "";
  tempResultEl.innerText = "";
});

clearLastEl.addEventListener("click", () => {
  display2El.innerText = "";
  dis2Num = "";
});

del.addEventListener(`click`, ()=>{
  let number = display2El.innerText;
  dis2Num = number.substring(0 , number.length - 4);
  display2El.innerText = dis2Num;
})

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "." 
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  } else if(e.key === `Backspace`){
    del.click()
  }else if(e.key === `c`){
    clearLastEl.click()
  }else if(e.key === `x`){
    clearAllEl.click()
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equalEl.click();
}
