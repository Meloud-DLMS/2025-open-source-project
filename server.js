const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'my-app/build')));


app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
})

app.get('/select', (req,res) => {
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
})

app.get('/login', (req,res) => {  
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
})

app.listen(8000);