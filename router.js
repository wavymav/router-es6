'use strict';

const http = require('http');
const url = require('url');
const qs = require('querystring');

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
        '/api/login': (req, res) => {
            // declaring an empty string for incoming data
            let body = '';

            // getting the data
            req.on('data', (data) => {
                // concating data packets
                body += data;
                console.log(body.length);

                // destroy connection if the body length is larger than 62958
                if (body.length > 62958) {
                    res.writeHead(413, {'Content-type': 'text/html'});
                    res.end('<h3>The content being uploaded exceeds the 0.062MB limit!</h3>');
                    req.connection.destroy();
                }
            });

            req.on('end', () => {
                // parses the querystring to an object
                let params = qs.parse(body);

                // loging the key values
                console.log('Username ', params['username']);
                console.log('Password ', params['password']);
                res.end();
            });
        }
    },
    'DNE': (req, res) => {
        res.writeHead(404);
        res.end('Content not found!');
    }
}

// Router
function router(req, res) {
    // parses the url into useable Url {}
    // the second param for the parse method converts the query prop string to an {}
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
