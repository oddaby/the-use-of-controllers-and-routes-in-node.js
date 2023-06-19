const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '/')));

// Serve the HTML files
app.get('/insert', (req, res) => {
  res.sendFile(path.join(__dirname, 'insert.html'));
});

app.get('/edit', (req, res) => {
  res.sendFile(path.join(__dirname, 'edit.html'));
});

app.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname, 'delete.html'));
});

// Start the server
const port = 3000; // Adjust the port number if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
