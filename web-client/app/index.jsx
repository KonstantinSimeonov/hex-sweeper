'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from '../node_modules/socket.io-client/dist/socket.io.js';

import ModalWindow from './ModalWindow.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import { AppMenu } from './AppMenu.jsx';
import { MineField } from './MineField.jsx';

import './styles/global.styl';

function renderField(field) {
    ReactDOM.render(<MineField field={field} />, document.getElementById('game-container'));
}

let socket, gosho;

function startGame() {
    socket = io.connect('http://localhost:6969');
    renderField([
        [null, 0, 0, 0, null],
        [0, 0, 0, 0, null],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, null],
        [null, 0, 0, 0, null],
    ]);
}

function renderModalWindow() {
    const children = closeFn => (<RegistrationForm close={closeFn}/>);
    ReactDOM.render(<ModalWindow title="Nigga!" getChildren={children}/>, document.getElementById('modal'));
}

ReactDOM.render(
    <div>
        <div>
            <AppMenu startGame={startGame} register={renderModalWindow}/>
        </div>
        <main id="game-container">
            
        </main>
        <div id="modal"></div>
    </div>,
    document.getElementById('app'));