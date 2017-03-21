'use strict';

import React, { Component } from 'react';

import { get as httpGet } from '../utils/json-requester.js';

import styles from './spectatable-games-list.styl';

export default class SpectatableGamesList extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        httpGet('http://localhost:6969/api/spectatable')
            .then(spectatable => this.setState({ spectatable }))
            .catch(console.log);
    }

    render() {
        let content;

        if(this.state.spectatable) {
            content = <ul className={styles.gamesList}>{this.state.spectatable.map(gameId => <li key={gameId} onClick={() => this.props.history.push('/spectate1/' + gameId)}>{gameId}</li>)}</ul>;
        } else {
            content = '';
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}