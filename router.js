'use strict';

const http = require('http');
const url = require('url')

// Router
function router(req, res) {
    // parses th url into useable Url {}
    let baseURI = url.parse(req.url, true);

    console.log('Requested route: ', baseURI);
    
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.end('<h1>Hello Web</h1>')
}

// Creating the server
http.createServer(router).listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
