# Hexagonal minesweeper

Web based minesweeper where the field and the cells have the shape of a hexagon.

## Features

- Play the game online at any time
    - Choose board size and difficulty
- Register and be able to save your current game
- Ranking for best times
- Spectate other players' games

## Run the app
- Run the server(you'll need mongodb set up):
```
cd server
npm install
npm start
```

- Run the client
```
cd web-client
npm install
webpack-dev-server --port 8081
```

## Technologies used

- Production
    - React
    - React router
    - history
    - Nodejs
    - MongoDB (MongoDB driver for Nodejs)
    - jQuery
    - socket.io
    - crypto.js
    - jsonwebtoken
    - node-uuid

- Development
    - Stylus
    - Webpack
    - Babel
    - Mocha
    - Chai
