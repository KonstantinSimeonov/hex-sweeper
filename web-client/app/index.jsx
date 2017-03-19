'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import io from '../node_modules/socket.io-client/dist/socket.io.js';

import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));

/*function renderField(field) {
    ReactDOM.render(<div>
        <MineField onMove={move} field={field} />
    </div>, document.getElementById('game-container'));
}

let socket, field;

function move(row, col) {
    console.log('what');
    socket.emit('move', { row, col });
}

function startGame() {
    socket = io.connect('http://localhost:6969', { query: 'size=5&mines=15' });
    
    socket.on('fieldReady', data => {
        field = data;
        renderField(field);
    });
    socket.on('fieldUpdate', updates => {
        for(const update of updates) {
            const { row, col, value } = update;

            field[row][col] = value;
        }

        console.log(updates);

        renderField(field);
    });

    socket.on('gameover', () => alert('noob'));
}

function renderModalWindow(children) {
    ReactDOM.render(<ModalWindow title="Choose a username and password" getChildren={children} />, document.getElementById('modal'));
}

const renderRegistrationForm = closeFn => <RegistrationForm close={closeFn} />,
    renderLoginForm = closeFn => <LoginForm close={closeFn} />;

ReactDOM.render(
    <div>
        <div>
            <AppMenu
                startGame={startGame}
                register={renderModalWindow.bind(null, renderRegistrationForm)}
                login={renderModalWindow.bind(null, renderLoginForm)} />
        </div>
        <main id="game-container"></main>
        <div id="modal"></div>
    </div>,
    document.getElementById('app'));*/