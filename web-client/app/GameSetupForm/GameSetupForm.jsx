'use strict';

import React, { Component } from 'react';

import TextInput from '../TextInput/TextInput.jsx';

import styles from './game-setup-form.styl';

export default class GameSetupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulties: [
                { name: 'low', minesPercentage: 0.2 },
                { name: 'medium', minesPercentage: 0.4 },
                { name: 'high', minesPercentage: 0.6 },
                { name: 'very high', minesPercentage: 0.75 },
                { name: 'custom' },
            ],
            selected: '',
            fieldSize: null,
            minesCount: null,
            spectatable: true
        };
    }

    onSelectDifficulty(difficulty) {
        this.setState({
            selected: difficulty.name,
            minesCount: this.state.fieldSize * difficulty.minesPercentage | 0
        });
    }

    onNamedInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit() {
        this.props.history.push(`/play?fieldSize=${this.state.fieldSize}&minesCount=${this.state.minesCount}&spectatable=${this.state.spectatable}`);
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
                        onChange={this.onNamedInputChange.bind(this)} />
                </div>
                <div>
                    <h3>Choose a difficulty</h3>
                    <ul className={styles.difficulties}>
                        {
                            this.state.difficulties.map(difficulty => {
                                const isSelected = difficulty.name === this.state.selected;
                                return (<li
                                    key={difficulty.name}
                                    className={`bottom-border-animated ${isSelected ? styles.selected : ''}`}
                                    onClick={this.onSelectDifficulty.bind(this, difficulty)}>
                                    {difficulty.name}</li>);
                            })
                        }
                    </ul>
                </div>
                <div className={styles.inputGroup + ' ' + (this.state.selected === 'custom' ? '' : 'hidden')}>
                    <h3>Choose mines count</h3>
                    <TextInput
                        name="minesCount"
                        placeholder="Mines count"
                        pattern={/^\d{1,3}$/}
                        patternErrorMessage="Mines count should be more than 0"
                        onChange={this.onNamedInputChange.bind(this)} />
                </div>
            </div>
            <div className={styles.inputGroup + ' ' + styles.play}>
                <div className={styles.hexagon + ' ' + styles.playBtn} onClick={this.onSubmit.bind(this)}>
                    Play
                    </div>
            </div>
        </div>);
    }
}
