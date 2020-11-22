const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app, creating instance of express
const app = express();

// Connect To MongoDB
const dbURI =
  'mongodb+srv://netninja:test12345@nodetuts.ilpln.mongodb.net/db-note?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// Use Body Parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// LEARN MIDDLEWARE
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('5fb9ebb4bc916f6d28db9ba7')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Response The Request
app.get('/', (req, res) => {
  //res.send('<p>Home Page</p>');
  //res.sendFile('./views/index.html', { root: __dirname });
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  //res.send('<p>About Page</p>');
  res.render('about', { title: 'About' });
});

// redirects
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// Blog Routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
