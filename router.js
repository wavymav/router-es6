'use strict';

const http = require('http');

// Router
function router(req, res) {
    console.log('Requested route: ' + req.url);
    console.log('Request method: ' + req.method);
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.end('<h1>Hello Web</h1>')
}

// Creating the server
http.createServer(router).listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
