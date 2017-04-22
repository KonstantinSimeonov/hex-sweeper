'use strict';

import React, { Component } from 'react';

import styles from './timer.styl';

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = { start: Date.now() / 1000, now: Date.now() / 1000 };
    }

    componentWillMount() {
        this.updateInterval = setInterval(() => this.setState({ now: Date.now() / 1000 }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        return (
            <div className={styles.timer}>
                <time>{this.state.now - this.state.start | 0}</time>
            </div>
        );
    }
}