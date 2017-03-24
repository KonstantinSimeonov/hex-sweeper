'use strict';

import React, { Component } from 'react';

import { get as httpGet } from '../utils/json-requester.js';

import RankingsTable from './RankingsTable.jsx';
import styles from './rankings.styl';

export default class Rankings extends Component {
    constructor(props) {
        super(props);

        this.state = { rankings: [] };
    }

    componentWillMount() {
         const { serverDomain } = window.appConfig;
        httpGet(`${serverDomain}/api/highscores`)
            .then(rankings => this.setState({ rankings }))
            .catch(console.log);
    }

    render() {
        return (
            <div className={styles.rankingsContainer}>
                <RankingsTable rankings={this.state.rankings} />
            </div>
        );
    }
}