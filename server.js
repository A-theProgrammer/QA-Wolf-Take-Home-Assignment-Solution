const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Endpoint to run Playwright script
app.get('/run-test', (req, res) => {
  const { spawn } = require('child_process');
  const playwrightProcess = spawn('node', [path.join(__dirname, 'index.js')]);

  let output = '';
  let errorOutput = '';

  // Set a timeout for the Playwright process
  const PLAYWRIGHT_TIMEOUT = 60000; // 60 seconds
  const timeoutId = setTimeout(() => {
    playwrightProcess.kill();
    res.status(500).send('Playwright script timed out.');
    console.error('Playwright script timed out.');
  }, PLAYWRIGHT_TIMEOUT);

  playwrightProcess.on('exit', () => {
    clearTimeout(timeoutId);
  });

  playwrightProcess.stdout.on('data', (data) => {
    output += data.toString();
    console.log(`Playwright stdout: ${data}`);
  });

  playwrightProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
    console.error(`Playwright stderr: ${data}`);
  });

  playwrightProcess.on('close', (code) => {
    console.log(`Playwright process exited with code ${code}`);
    if (code === 0) {
      res.status(200).send(`Playwright script ran successfully!\nOutput:\n${output}`);
    } else {
      res.status(500).send(`Playwright script failed with code ${code}\nError:\n${errorOutput}\nOutput:\n${output}`);
    }
  });

  playwrightProcess.on('error', (err) => {
    console.error('Failed to start Playwright process:', err);
    res.status(500).send(`Failed to start Playwright process: ${err.message}`);
  });
});

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request received for: ${req.url}`);
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
