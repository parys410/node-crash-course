const express = require('express');
const bodyParser = require('body-parser');

// express app, creating instance of express
const app = express();

// listening for request
app.listen(3001);

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Response The Request
app.get('/', (req, res) => {
  //res.send('<p>Home Page</p>');
  res.sendFile('./views/index.html', { root: __dirname });
});

app.post('/payment', (req, res) => {
  //res.send('<p>Home Page</p>');
  // Get POST Data
  // const email = req.body.inputEmail;
  // const username = req.body.inputUsername;
  // console.log(`Email: ${email} and Username: ${username}`);
  console.log('Request Body', req.body);
  res.sendFile('./views/index.html', { root: __dirname });
  //   res.redirect(
  //     `http://localhost:8080/step?email=${email}&username=${username}`
  //   );
});

app.get('/about', (req, res) => {
  //res.send('<p>About Page</p>');
  res.sendFile('./views/about.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
