'use strict';

import React, { Component } from 'react';

import generateField from '../../../shared/generate-field.js';

import Game from './Game.jsx';
import MineField from './MineField.jsx';

export default class PlayerGame extends Game {
    constructor(props) {
        const urlQuery = new URLSearchParams(props.location.search),
            fieldSize = +urlQuery.get('fieldSize'),
            minesCount = +urlQuery.get('minesCount'),
            spectatable = urlQuery.get('spectatable'),
            load = urlQuery.get('load') === 'true';

        super(props);
        this.connect();

        const fieldGenOptions = { getCell() { return 0; }, getNullCell() { return null; } };


        if (load) {
            this.socket.on('load:success', ({ size }) => {
                const field = generateField(fieldGenOptions, size);
                this.setState({ field });
            });
            this.socket.emit('load');
        } else {
            console.log('init');
            this.socket.on('initGame:success', () => {
                console.log('zdr');
                const field = generateField(fieldGenOptions, fieldSize);

                this.setState({ field });
            });
            this.socket.emit('initGame', { minesCount, fieldSize, spectatable });
        }
    }

    onPlayerMove(row, col) {
        this.socket.emit('move', { row, col });
    }

    onCellMarker(row, col) {
        this.socket.emit('mark', { row, col });
    }

    onSaveClick() {
        this.socket.emit('save');
    }
}
