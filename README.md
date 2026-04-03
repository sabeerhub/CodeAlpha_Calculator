# 🧮  Calculator

A sleek, modern calculator web application built with pure HTML, CSS, and JavaScript — featuring a stunning glassmorphism UI design with animated background, smooth interactions, and full keyboard support.

---

## ✨ Features

- **Arithmetic Operations** — Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Real-time Expression Display** — Shows the current operation above the result
- **Clear (C)** — Resets calculator to initial state
- **Delete (⌫)** — Removes the last entered digit
- **Sign Toggle (+/−)** — Flips positive/negative
- **Percent (%)** — Converts current number to percentage
- **Decimal Support** — Decimal point with duplication guard
- **Chained Operations** — Auto-evaluates before applying the next operator (e.g. 3 + 4 × 2)
- **Error Handling** — Division-by-zero and overflow messages
- **Keyboard Support** — Full keyboard input (digits, operators, Enter, Backspace, Escape)
- **Responsive Layout** — Works on mobile, tablet, and desktop

---

## 🎨 UI Design

- **Glassmorphism** — Frosted glass card with `backdrop-filter: blur()`
- **Animated Gradient Background** — Deep space palette with floating radial orbs
- **Smooth Micro-interactions** — Button hover lift, ripple effect on press, operator glow
- **Dynamic Font Sizing** — Result text shrinks automatically for long numbers
- **Custom Typography** — JetBrains Mono (display) + Outfit (UI)
- **Entrance Animation** — Calculator fades and slides in on load

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Structure  | HTML5 (semantic markup)             |
| Styling    | CSS3 (variables, grid, animations, backdrop-filter) |
| Logic      | Vanilla JavaScript (ES2020, strict mode) |
| Fonts      | Google Fonts — Outfit & JetBrains Mono |

No frameworks, no dependencies, no build tools required.

---

## 🚀 How to Run

### Option 1 — Open directly
1. Download or clone this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)

### Option 2 — Via VS Code Live Server
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Option 3 — Simple HTTP server
```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```
Then visit `http://localhost:8080`

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0–9` | Enter digits |
| `.` `,` | Decimal point |
| `+` `-` `*` `/` | Operators |
| `Enter` `=` | Evaluate |
| `Backspace` | Delete last digit |
| `Escape` / `Delete` | Clear all |
| `%` | Percent |

---

## 📁 Project Structure

```
CodeAlpha_Calculator/
├── index.html   ← App markup & layout
├── style.css    ← Glassmorphism styles & animations
├── script.js    ← Calculator logic & keyboard handling
└── README.md    ← Project documentation
```

---

## 📸 Demo Notes

- All buttons respond with a ripple animation — ideal for screen recording
- Active operator is highlighted with a blue glow
- Error states display friendly messages (e.g., "Can't ÷ 0")
- Console is completely clean (zero errors or warnings)

---

## 👤 Author

**Developed for the CodeAlpha Frontend Development Internship**  
Repository: `CodeAlpha_Calculator`

---

## 📄 License

MIT — free to use, modify, and distribute.
