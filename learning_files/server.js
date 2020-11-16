const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((request, response) => {
  //console.log(request.url, request.method);

  // lodash
  const num = _.random(0, 20);
  //console.log(num);
  const greet = _.once(() => {
    console.log('hello');
  });
  greet();
  greet();

  // set header content type
  response.setHeader('Content-Type', 'text/html');

  let path = './views/';

  switch (request.url) {
    case '/':
      path += 'index.html';
      response.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      response.statusCode = 200;
      break;
    case '/about-us':
      response.statusCode = 301;
      response.setHeader('Location', '/about');
      response.end();
      break;
    case '/payment':
      response.statusCode = 301;
      response.setHeader(
        'Location',
        'http://localhost:8080/mobilecheckin?ddVYxzgRvuLjSkX0nFHAFQ=%3D'
      );
      response.end();
      break;
    default:
      path += '404.html';
      response.statusCode = 404;
      break;
  }

  // Send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      response.end();
    } else {
      //response.write(data);

      response.end(data);
    }
  });
});

server.listen(3001, 'localhost', () => {
  console.log('listening for request on port 3001');
});
