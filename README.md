# Hexagonal minesweeper

Web based minesweeper where the field and the cells have the shape of a hexagon.
You can play it [here](https://hexsweeper.herokuapp.com). Initial loading can take several seconds because heroku sleeps apps in free mode.

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

- Run the client(will start a webpack dev server on port 8081)
```
cd web-client
npm install
npm run dev-start
```

- Building the clients
    - web

    ```
        cd web-client
        npm install
        npm run web-build
    ```

    - electron desktop
    ```
        cd web-client
        npm install
        npm run desktop-build
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
    - cors
    - harp

- Development
    - Stylus
    - Webpack and loaders
    - Babel
    - Mocha
    - Chai
    - uglifyjs

## TODOS
- unit test socket sessions with mocking
- unit test in-memory game storage
    - garbage collection is working buggy
- integration test socket session with mock client
- setup ci
- setup sane packaging for deployment
- engineer rating logic
    - could be done by calculus
    - think of other possibilities
- setup shared code between client and server
- make ui responsive
- improve time measurement logic
- split server code in two smaller apps - restful api and gaming server