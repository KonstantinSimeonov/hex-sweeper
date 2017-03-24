'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

import { get as httpGet } from '../utils/json-requester.js';

import Loader from '../Loader/Loader.jsx';

import styles from './spectatable-games-list.styl';


export default class SpectatableGamesList extends Component {
    constructor(props) {
        super(props);

const { serverDomain } = window.appConfig;
        this.state = {};

        httpGet(`${serverDomain}/api/spectatable`)
            .then(spectatable => setTimeout(() => this.setState({ spectatable }), 1000))
            .catch(() => toastr.warning('Failed to fetch games from the remote server! Check your internet connection and try again.'));
    }

    render() {
        let content;

        if (this.state.spectatable) {
            content = <ul className={styles.gamesList}>{this.state.spectatable.map(gameId =>
                <li key={gameId}>
                    <Link to={`/spectate/${gameId}`}>
                        {gameId}
                    </Link>
                </li>)}
            </ul>;
        } else {
            content = '';
        }

        return (
            <div className={styles.spectatableContainer}>
                {content ? content : <Loader />}
            </div>
        );
    }
}