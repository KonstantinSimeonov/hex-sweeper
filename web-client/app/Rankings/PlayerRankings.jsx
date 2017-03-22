'use strict';

import React, { Component } from 'react';
import toastr from 'toastr';

import { get as httpGet } from '../utils/json-requester.js';
import RankingsTable from './RankingsTable.jsx';

import styles from './rankings.styl'; 

export default class PlayerRankings extends Component {
    constructor(props) {
        super(props);

        this.state = { rankings: [] };
    }

    componentWillMount() {
        httpGet(`http://localhost:6969/api/highscores/${localStorage.getItem('username')}`)
            .then(rankings => this.setState({ rankings }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className={styles.rankingsContainer}>
                <RankingsTable rankings={this.state.rankings} />
            </div>
        );
    }
}
