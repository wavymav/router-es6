'use strict';

const http = require('http');
const url = require('url');

// Methods and routes
let routes = {
    'GET': {
        '/': (req, res) => {
            res.writeHead(200, {'Content-type' : 'text/html'});
            res.end('<h1>Hello Web</h1>');
        },
        '/about': (req, res) => {
            res.writeHead(200, {'Content-type' : 'text/html'});
            res.end('<h1>The About Page</h1>');
        },
        '/api/info': (req, res) => {
            res.writeHead(200, {'Content-type' : 'application/json'});
            res.end(`${JSON.stringify(req.queryParams)}`);
        }
    },
    'POST': {

    },
    'DNE': (req, res) => {
        res.writeHead(404);
        res.end('Content not found!');
    }
}

// Router
function router(req, res) {
    // parses the url into useable Url {}
    let baseURI = url.parse(req.url, true);

    // stores the value of routes{} keys [request method & request path(route)]
    let resolveRoute = routes[req.method][baseURI.pathname];

    // invokes the route if found
    if (resolveRoute != undefined) {
        req.queryParams = baseURI.query;
        resolveRoute(req, res);
    } else {
        routes['DNE'](req, res)
    }
}

// Creating the server
http.createServer(router).listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
