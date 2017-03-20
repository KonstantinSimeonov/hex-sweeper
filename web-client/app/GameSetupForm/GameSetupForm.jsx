'use strict';

import React, { Component } from 'react';

import TextInput from '../TextInput/TextInput.jsx';

import { get as httpGet } from '../utils/json-requester.js';

import styles from './game-setup-form.styl';

export default class GameSetupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulties: [],
            selected: '',
            fieldSize: null,
            minesCount: null
        };

        httpGet('http://localhost:6969/api/difficulties')
            .then(({ difficulties }) => this.setState({ difficulties: difficulties.concat(['custom']) }))
            .catch(console.log);
    }

    onSelectDifficulty(difficulty) {
        this.setState({ selected: difficulty });
    }

    onNamedInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit() {
        if(this.state.selected && this.state.selected !== 'custom') {
            this.props.history.push(`/play?fieldSize=${this.state.fieldSize}&difficulty=${this.state.selected}`);
        } else {
            this.props.history.push(`/play?fieldSize=${this.state.fieldSize}&minesCount=${this.state.minesCount}`);
        }
    }
    
    render() {
        return (<div className={styles.gameSetupForm}>
            <div className={styles.difficultiesContainer}>
                <div className={styles.inputGroup}>
                    <h3>Choose field size</h3>
                    <TextInput
                        name="fieldSize"
                        placeholder="Field size"
                        pattern={/^\d{1,3}$/}
                        patternErrorMessage="Field size must be between 2 and 100"
                        onChange={this.onNamedInputChange.bind(this)}/>
                </div>
                <h3>Choose a difficulty</h3>
                <ul className={styles.difficulties}>
                    {
                        this.state.difficulties.map(difficultyName => {
                            const isSelected = difficultyName === this.state.selected;
                            return (<li
                                key={difficultyName}
                                className={`bottom-border-animated ${isSelected ? styles.selected : ''}`}
                                onClick={this.onSelectDifficulty.bind(this, difficultyName)}>
                                {difficultyName}</li>);
                        })
                    }
                </ul>
                <div className={styles.inputGroup + ' ' + (this.state.selected === 'custom' ? '' : 'hidden')}>
                    <h3>Choose mines count</h3>
                    <TextInput
                        name="minesCount"
                        placeholder="Mines count"
                        pattern={/^\d{1,3}$/}
                        patternErrorMessage="Mines count should be more than 0"
                        onChange={this.onNamedInputChange.bind(this)}/>
                </div>
                <div className={styles.inputGroup + ' ' + styles.play}>
                    <div className={styles.hexagon + ' ' + styles.playBtn} onClick={this.onSubmit.bind(this)}>
                        Play
                    </div>
                </div>
            </div>
        </div>);
    }
}
