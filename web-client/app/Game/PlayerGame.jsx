'use strict';

import React, { Component } from 'react';

import generateField from '../../../shared/generate-field.js';

import Game from './Game.jsx';
import MineField from './MineField.jsx';

import styles from './game.styl';

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
            this.socket.on('load:failure', () => console.log('wawa'));
            this.socket.emit('load');
        } else {
            this.socket.on('initGame:success', () => {
                const field = generateField(fieldGenOptions, fieldSize);

                this.setState({ field });
            });
            this.socket.emit('initGame', { minesCount, fieldSize, spectatable });
        }

        this.socket.on('save:success', () => {
            this.setState({ saveBtnClass: styles.success });

            setTimeout(() => this.setState({ saveBtnClass: '' }), 2000);
        });

        this.socket.on('win', () => this.props.history.push('/highscore'));
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
