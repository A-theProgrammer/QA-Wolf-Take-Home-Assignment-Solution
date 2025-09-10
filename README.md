# QA Wolf Take Home Assignment – Solution Report

## Overview

This project is a solution to the QA Wolf Take Home Assignment for the QA Engineer role. The assignment requires the creation of an automated script using JavaScript and Playwright to validate that the first 100 articles on Hacker News' "newest" page are sorted from newest to oldest. Additionally, a simple user interface is provided to run the script and view results interactively.

Refer to README-question for the original question tot his assignment.

---

## File Explanations

### 1. `index.js`
This is the main automation script. It uses Playwright to:
- Launch a Chromium browser in headless mode.
- Navigate to the Hacker News "newest" page.
- Scrape the first 100 articles, paginating as needed.
- Extract each article's title and ISO timestamp.
- Validate that the articles are sorted from newest to oldest by timestamp.
- Print a summary, including the first five article titles and their ISO timestamps.
- Output clear pass/fail results and details about any sorting errors.
- Handles errors gracefully and ensures the browser is always closed.

### 2. `server.js`
This file sets up an Express.js server to:
- Serve the static web interface from the `public` directory.
- Provide an endpoint (`/run-test`) that runs the Playwright script and returns its output.
- Handle timeouts and errors robustly, ensuring the user receives feedback if the script fails or takes too long.

### 3. `public/index.html`
This is the main user interface. It:
- Presents a button to run the Playwright test.
- Shows a spinner while the test is running.
- Displays the output of the script in a styled `<pre>` block.
- Uses color and icons to indicate pass/fail status.
- Uses JavaScript to handle button clicks, fetch results, and update the UI dynamically.

### 4. `public/style.css`
This file provides styling for the web interface, including:
- Centered layout and modern font.
- Styled button with hover and disabled states.
- A visually appealing spinner animation.
- Enhanced output area with background, border, and shadow for readability.

### 5. `README.md`
The original assignment instructions, including requirements, evaluation criteria, and submission guidelines.

---

## How to Run the Project

### Prerequisites
- Node.js and npm installed on your system.

### Installation
1. Install dependencies:
   ```
   npm install
   ```
2. (If Playwright is not installed automatically, run:)
   ```
   npm install playwright
   ```

### Running the Automation Script Directly
- To run the Playwright script and see output in the terminal:
  ```
  node index.js
  ```

### Running the Web Interface
1. Start the Express server:
   ```
   node server.js
   ```
2. Open your browser and go to:
   [http://localhost:3000](http://localhost:3000)
3. Click the "Run Playwright Test" button to execute the script and view results interactively.

---

## Solution Highlights
- **Automation**: Fully automated browser-based validation using Playwright.
- **Robustness**: Handles pagination, missing data, and errors gracefully.
- **User Experience**: Simple, modern web UI with clear feedback and a loading spinner.
- **Reporting**: Outputs both a summary and details about the sorting check, including the first five article titles and their ISO timestamps.

---

## Notes
- The script uses selectors that match the current Hacker News markup. If the site changes, selectors may need to be updated.
- The UI is intentionally simple but can be extended for more features or reporting as needed.

---

## Author
Prepared as part of the QA Wolf Take Home Assignment by an early-career software professional.
