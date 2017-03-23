'use strict';

import React, { Component } from 'react';
import toastr from 'toastr';

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

        const fieldGenOptions = { getCell() { return 0; }, getNullCell() { return null; } },
            generatedField = generateField(fieldGenOptions, fieldSize);

        if (load) {
            this.socket.on('load:success', ({ size }) => {
                const field = generateField(fieldGenOptions, size);
                this.setState({ field });
                setTimeout(() => this.setState({ loading: false }), 1000);
                console.log(this.socket);
            });
            this.socket.on('load:failure', () => console.log('wawa'));
            this.socket.emit('load');
        } else {
            this.socket.on('initGame:success', () => {
                this.setState({ field: generatedField });
                setTimeout(() => this.setState({ loading: false, startDate: Date.now() }), 1000);
            });
            this.socket.emit('initGame', { minesCount, fieldSize, spectatable });
        }

        this.socket.on('save:success', () => toastr.success('Game saved successfully!'));

        this.socket
            .on('gameover', () => {
                toastr.error('Boom. Lost!');
                setTimeout(() => this.props.history.goBack(), 5000);
            })
            .on('win', () => {
                toastr.success('Victory');
                setTimeout(() => this.props.history.push('/rankings'), 5000);
            });

        console.log(this.state.gameStarted);
    }

    onPlayerMove(row, col) {
        if (!this.state.gameStarted) {
            this.setState({ gameStarted: true, startDate: Date.now() });
        }

        this.socket.emit('move', { row, col });
    }

    onCellMarker(row, col) {
        this.socket.emit('mark', { row, col });
    }

    onSaveClick() {
        this.socket.emit('save');
    }
}
