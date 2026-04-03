"use strict";

const display     = document.getElementById("result");
const exprDisplay = document.getElementById("expression");

let currentInput   = "0";
let previousInput  = "";
let operator       = null;
let shouldReset    = false;
let justEvaluated  = false;

const OP_SYMBOLS  = { "÷": "/", "×": "*", "−": "-", "+": "+" };
const OP_DISPLAY  = { "/": "÷", "*": "×", "-": "−", "+": "+"  };

function formatNumber(num) {
  if (!isFinite(num)) return "Error";
  let formatted = parseFloat(num.toPrecision(12));
  return String(formatted);
}

function updateDisplay(value, isError = false) {
  display.classList.remove("large", "medium", "small", "error", "pop");
  void display.offsetWidth;

  if (isError) {
    display.textContent = value;
    display.classList.add("error", "pop");
    return;
  }

  const len = String(value).replace("-", "").length;
  if      (len <= 9)  display.classList.add("large");
  else if (len <= 13) display.classList.add("medium");
  else                display.classList.add("small");

  display.classList.add("pop");
  display.textContent = value;
}

function buildExpression() {
  if (previousInput !== "" && operator) {
    exprDisplay.textContent = `${previousInput} ${OP_DISPLAY[operator] ?? operator}`;
  } else {
    exprDisplay.textContent = "\u00A0"; 
  }
}

function setActiveOperator(symbol) {
  document.querySelectorAll(".btn-operator").forEach(btn => {
    btn.classList.toggle("active-operator", btn.dataset.value === symbol);
  });
}

function clearActiveOperator() {
  document.querySelectorAll(".btn-operator").forEach(btn =>
    btn.classList.remove("active-operator")
  );
}

function triggerRipple(btn) {
  btn.classList.remove("ripple");
  void btn.offsetWidth;
  btn.classList.add("ripple");
  btn.addEventListener("animationend", () => btn.classList.remove("ripple"), { once: true });
}

function inputNumber(digit) {
  if (shouldReset) {
    currentInput = digit === "0" ? "0" : digit;
    shouldReset  = false;
  } else {
    if (currentInput === "0" && digit !== ".") {
      currentInput = digit;
    } else {
      if (currentInput.length >= 15) return;
      currentInput += digit;
    }
  }
  justEvaluated = false;
  updateDisplay(currentInput);
  buildExpression();
}

function inputDecimal() {
  if (shouldReset) {
    currentInput = "0.";
    shouldReset  = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  justEvaluated = false;
  updateDisplay(currentInput);
}

function inputOperator(sym) {
  const jsOp = OP_SYMBOLS[sym];
  if (!jsOp) return;

  if (operator && shouldReset && !justEvaluated) {
    operator = jsOp;
    setActiveOperator(sym);
    buildExpression();
    return;
  }

  if (previousInput !== "" && !shouldReset && !justEvaluated) {
    evaluate(false);
  }

  previousInput = currentInput;
  operator      = jsOp;
  shouldReset   = true;
  justEvaluated = false;

  setActiveOperator(sym);
  buildExpression();
}

function evaluate(userTriggered = true) {
  if (operator === null || previousInput === "") return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (operator === "/" && curr === 0) {
    exprDisplay.textContent = `${previousInput} ${OP_DISPLAY[operator]} ${currentInput} =`;
    updateDisplay("Can't ÷ 0", true);
    reset(false);
    return;
  }

  let result;
  switch (operator) {
    case "+": result = prev + curr; break;
    case "-": result = prev - curr; break;
    case "*": result = prev * curr; break;
    case "/": result = prev / curr; break;
    default:  return;
  }

  if (!isFinite(result)) {
    updateDisplay("Overflow", true);
    reset(false);
    return;
  }

  const formatted = formatNumber(result);

  if (userTriggered) {
    exprDisplay.textContent = `${previousInput} ${OP_DISPLAY[operator]} ${currentInput} =`;
  }

  currentInput   = formatted;
  previousInput  = "";
  operator       = null;
  shouldReset    = true;
  justEvaluated  = userTriggered;

  clearActiveOperator();
  updateDisplay(formatted);
}

function doDelete() {
  if (display.classList.contains("error")) {
    reset();
    return;
  }
  if (shouldReset || currentInput === "0") return;

  currentInput = currentInput.slice(0, -1) || "0";
  updateDisplay(currentInput);
}

function doSign() {
  if (currentInput === "0" || display.classList.contains("error")) return;
  currentInput = currentInput.startsWith("-")
    ? currentInput.slice(1)
    : "-" + currentInput;
  updateDisplay(currentInput);
}

function doPercent() {
  if (display.classList.contains("error")) return;
  const val = parseFloat(currentInput);
  if (isNaN(val)) return;
  currentInput = formatNumber(val / 100);
  updateDisplay(currentInput);
}

function reset(clearExpression = true) {
  currentInput  = "0";
  previousInput = "";
  operator      = null;
  shouldReset   = false;
  justEvaluated = false;
  if (clearExpression) exprDisplay.textContent = "\u00A0";
  display.classList.remove("error");
  clearActiveOperator();
  updateDisplay("0");
}

document.querySelector(".btn-grid").addEventListener("click", e => {
  const btn = e.target.closest(".btn");
  if (!btn) return;

  triggerRipple(btn);

  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  switch (action) {
    case "number":   inputNumber(value);          break;
    case "decimal":  inputDecimal();               break;
    case "operator": inputOperator(value);         break;
    case "equals":   evaluate(true);               break;
    case "clear":    reset();                      break;
    case "delete":   doDelete();                   break;
    case "sign":     doSign();                     break;
    case "percent":  doPercent();                  break;
  }
});

const KEY_MAP = {
  "0": () => inputNumber("0"),
  "1": () => inputNumber("1"),
  "2": () => inputNumber("2"),
  "3": () => inputNumber("3"),
  "4": () => inputNumber("4"),
  "5": () => inputNumber("5"),
  "6": () => inputNumber("6"),
  "7": () => inputNumber("7"),
  "8": () => inputNumber("8"),
  "9": () => inputNumber("9"),
  ".": () => inputDecimal(),
  ",": () => inputDecimal(),
  "+": () => inputOperator("+"),
  "-": () => inputOperator("−"),
  "*": () => inputOperator("×"),
  "x": () => inputOperator("×"),
  "X": () => inputOperator("×"),
  "/": () => inputOperator("÷"),
  "Enter":     () => evaluate(true),
  "=":         () => evaluate(true),
  "Backspace": () => doDelete(),
  "Delete":    () => reset(),
  "Escape":    () => reset(),
  "%":         () => doPercent(),
};

document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const handler = KEY_MAP[e.key];
  if (handler) {
    e.preventDefault();
    handler();

    const btns = document.querySelectorAll(".btn");
    btns.forEach(btn => {
      const action = btn.dataset.action;
      const val    = btn.dataset.value;
      let match    = false;

      if      (action === "number"   && val === e.key)         match = true;
      else if (action === "decimal"  && (e.key === "." || e.key === ",")) match = true;
      else if (action === "operator" && OP_SYMBOLS[val] === OP_SYMBOLS[e.key]) match = true;
      else if (action === "operator" && val === "÷" && e.key === "/")           match = true;
      else if (action === "operator" && val === "×" && (e.key === "*" || e.key.toLowerCase() === "x")) match = true;
      else if (action === "operator" && val === "−" && e.key === "-")           match = true;
      else if (action === "equals"   && (e.key === "Enter" || e.key === "="))   match = true;
      else if (action === "clear"    && (e.key === "Escape" || e.key === "Delete")) match = true;
      else if (action === "delete"   && e.key === "Backspace")                  match = true;
      else if (action === "percent"  && e.key === "%")                          match = true;

      if (match) triggerRipple(btn);
    });
  }
});

updateDisplay("0");
