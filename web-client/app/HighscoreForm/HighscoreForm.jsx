'use strict';

import React, { Component } from 'react';

import { put as httpPut } from '../utils/json-requester.js';
import TextInput from '../TextInput/TextInput.jsx';

import styles from './highscore-form.styl';

export default class HighscoreForm extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    submit() {
        const data = {
            nickname: this.state.nickname,
            token: localStorage.getItem('token')
        };

        httpPut('http://localhost:6969/api/highscores', data)
            .then(() => this.props.history.push('/ranking'))
            .catch(console.log);
    }

    render() {
        return (
            <div className={styles.highscoreForm}>
                <div>
                    <TextInput
                    placeholder="Nickname"
                    pattern={/[a-z]{2,15}/i}
                    patternErrorMessage="Between 2 and 15 latin letters"
                    onChange={event => this.setState({ nickname: event.target.value })}/>
                </div>
                <div>
                    <a className="custom-btn" onClick={this.submit.bind(this)}>Submit</a>
                </div>
            </div>
        );
    }
}
