'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const server = express(),
    serverConfig = require('./server-config');

server.use(cors({ origin: serverConfig.corsConfig.allowedOrigins }));

const socketServer = require('http').createServer(server);

server
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
