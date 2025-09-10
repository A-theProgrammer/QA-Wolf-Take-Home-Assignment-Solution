# 🐺 QA Wolf Take Home Assignment – Solution

## 📌 Overview

This repository contains my solution to the **QA Wolf Take Home Assignment** for the [QA Engineer role](https://www.task-wolf.com/apply-qae).

The assignment required:

1. Writing a **Playwright automation script** in JavaScript to validate that the **first 100 articles on [Hacker News/newest](https://news.ycombinator.com/newest)** are sorted from newest to oldest.
2. Recording a **short Loom video** demonstrating the code execution and answering: *“Why do you want to work at QA Wolf?”*

In addition to the script, I built a **simple interactive web interface** that allows running the Playwright script from a browser and viewing the results in real time.

---

## 🗂️ Project Structure

| File                 | Description                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `index.js`           | Main Playwright script. Scrapes Hacker News, checks sorting of 100 newest articles, outputs summary & pass/fail results. |
| `server.js`          | Express server to run the script via an API endpoint and serve the web UI. Handles errors & timeouts gracefully.         |
| `public/index.html`  | User interface with a button to run the test, spinner for loading, and results display.                                  |
| `public/style.css`   | Styling for the UI – modern, centered layout, animated spinner, and styled output area.                                  |
| `README.md`          | This documentation.                                                                                                      |
| `readme-question.md` | Original assignment instructions provided by QA Wolf.                                                                    |

---

## 🚀 How to Run the Project

### Prerequisites

* [Node.js](https://nodejs.org/) (>= 16.x recommended)
* npm (comes with Node)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

If Playwright doesn’t install automatically:

```bash
npm install playwright
```

### Run Script in Terminal

Run the Playwright script directly:

```bash
node index.js
```

### Run with Web Interface

1. Start the server:

   ```bash
   node server.js
   ```
2. Open your browser at [http://localhost:3000](http://localhost:3000).
3. Click **“Run Playwright Test”** to execute and view results interactively.

---

## ✅ Solution Highlights

* **Automation**: Playwright validates sorting of Hacker News articles with robust checks.
* **Pagination Handling**: Fetches across multiple pages to get the first 100 results.
* **Error Handling**: Graceful handling of failures, timeouts, and site changes.
* **User-Friendly UI**: Lightweight web interface for non-technical users to run the test.
* **Clear Reporting**: Displays summary with first 5 articles and detailed pass/fail output.

---

## 🔍 Notes

* The script relies on Hacker News’ current HTML structure. If their markup changes, selectors may need updating.
* The UI is intentionally simple but designed to be extendable for richer reporting or test management.

---

## 🧑‍💻 Author

Prepared by **Archit Biswas**, as part of the QA Wolf Take Home Assignment.

---

✨ This format combines the **assignment context**, **solution details**, and **usage guide** so that anyone landing on your GitHub repo immediately understands both the problem and your implementation.

Do you want me to also make this **resume-style polished** (like a portfolio piece you’d showcase) or keep it **assignment-focused** (closer to how QA Wolf expects submissions)?
