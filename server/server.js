'use strict';

const express = require('express'),
    bodyParser = require('body-parser');

const server = express(),
    socketServer = require('http').createServer(server),
    serverConfig = require('./server-config');

// TODO: extract with other middlewares
function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', serverConfig.corsConfig.allowedOrigins);
    res.header('Access-Control-Allow-Methods', serverConfig.corsConfig.allowedMethods);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

server
    .use(cors)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

const dbConnect = require('./data/connect')(serverConfig.dbUri);

const serverPromise = dbConnect
    .then(db => {
        const dbCollections = {
            'users': db.collection('users'),
            'games': db.collection('games'),
            'highscores': db.collection('highscores')
        };

        const dataServices = require('./data/services')(dbCollections),
            controllers = require('./controllers')({ dataServices, serverConfig }),
            // TODO: automagic for middleware loading
            middlewares = { authMiddleware: require('./middlewares/auth-middleware')({ dataServices, serverConfig }) };

        require('./sockets')(socketServer, { serverConfig, dataServices });
        require('./routing')({ server, controllers, middlewares });
    });

module.exports = serverPromise
    .then(() => socketServer.listen(serverConfig.port, () => console.log(`server running at port: ${serverConfig.port}`)))
    .catch(err => console.log(err));
