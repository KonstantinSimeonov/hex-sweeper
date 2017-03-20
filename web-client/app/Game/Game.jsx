'use strict';

import React, { Component } from 'react';

import io from '../../node_modules/socket.io-client/dist/socket.io.min.js'

import { get as httpGet, post as httpPost } from '../utils/json-requester.js';
import generateField from '../../../shared/generate-field.js';

import MineField from './MineField.jsx';

import styles from './game.styl';

export default class Game extends Component {
    constructor(props) {
        super(props);

        const urlQuery = new URLSearchParams(props.location.search),
            size = urlQuery.get('fieldSize');

        const field = generateField({
            getCell() { return 0; },
            getNullCell() { return null; }
        }, +size);

        this.state = { field };

        // const socket = io.connect('http://localhost:6969', { query: props.location.search.substr(1) });
    }

    render() {
        return (<div className={styles.gameContainer}>
            { this.state.field ? <MineField field={this.state.field} /> : '' }
        </div>);
    }
}
