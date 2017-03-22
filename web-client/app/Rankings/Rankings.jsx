'use strict';

import React, { Component } from 'react';

import { get as httpGet } from '../utils/json-requester.js';

import styles from './rankings.styl';

export default class Rankings extends Component {
    constructor(props) {
        super(props);

        this.state = { rankings: [] };
    }

    componentWillMount() {
        httpGet('http://localhost:6969/api/highscores')
            .then(rankings => this.setState({ rankings }))
            .catch(console.log);
    }

    render() {
        return (
            <div className={styles.rankingsContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Field size</th>
                            <th>Mines count</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.rankings.map((rank, position) => (
                                <tr key={position}>
                                    <td>{position + 1}.</td>
                                    <td>{rank.nickname ? rank.nickname : 'anonymous'}</td>
                                    <td>{rank.fieldSize}</td>
                                    <td>{rank.minesCount}</td>
                                    <td>{Math.ceil(rank.time)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}