'use strict';

const express = require('express'),
    bodyParser = require('body-parser');

const server = express(),
    socketServer = require('http').createServer(server);
require('./sockets')(socketServer);

function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

server
    .use(cors)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

const serverConfig = require('./server-config'),
    dbConnect = require('./data/connect')(serverConfig.dbUri);

const serverPromise = dbConnect
    .then(db => {
        const dbCollections = {
            'users': db.collection('users'),
            'games': db.collection('games')
        };

        const dataServices = require('./data/services')(dbCollections),
            controllers = require('./controllers')({ dataServices, serverConfig }),
            middlewares = { authMiddleware: require('./middlewares/auth-middleware')({ dataServices, serverConfig }) };

        
        require('./routing')({ server, controllers, middlewares });
    });

module.exports = serverPromise
    .then(() => socketServer.listen(serverConfig.port, () => console.log(`http://localhost:${serverConfig.port}`)))
    .catch(err => console.log(err));