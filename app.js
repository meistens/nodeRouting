const http = require('http');
const fs = require('fs');

//creating the server
const server = http.createServer(function (req, res) {
   console.log('you are on ' + req.url);

   //set header-content type
   res.setHeader('Content-Type', 'text/html');

   //basic routing using switch-case
   let dir = './public/'
   switch (req.url) {
      case '/':
         dir += 'index.html'
         res.statusCode = 200;
         break;

      case '/about':
         dir += 'about.html'
         res.statusCode = 200;
         break;

      case '/contact':
         dir += 'contact.html'
         res.statusCode = 200;
         break;

      //redirect to homepage if /home is used instead of '/'
      case '/home':
         res.statusCode = 301;
         res.setHeader('Location', '/');
         res.end();
         break;

      default:
         dir += 'errorPage.html'
         res.statusCode = 404;
         break;
   }

   //read path using the fiesystem
   fs.readFile(dir, function (err, data) {
      if (err) {
         console.log(err);
         res.end();
      } else {
         res.write(data);
         res.end();
      }
   });
});

//server listen function
server.listen(4000, 'localhost', function () {
   console.log('Mein  Freund, welcome to Port 4000!');
});