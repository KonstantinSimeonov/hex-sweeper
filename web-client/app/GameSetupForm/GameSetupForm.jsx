'use strict';

import React, { Component } from 'react';
import toastr from 'toastr';

import TextInput from '../TextInput/TextInput.jsx';
import countCellsInHexagon from '../logic/count-cells.js';

import styles from './game-setup-form.styl';

export default class GameSetupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulties: [
                { name: 'low', minesPercentage: 0.15 },
                { name: 'medium', minesPercentage: 0.2 },
                { name: 'high', minesPercentage: 0.25 },
                { name: 'very high', minesPercentage: 0.35 },
                { name: 'custom' },
            ],
            selected: '',
            fieldSize: null,
            minesCount: null,
            spectatable: false,
            load: false,
            isLoggedUser: localStorage.getItem('token') && localStorage.getItem('username')
        };

        console.log(this.state.selected === 'custom');
    }

    onSelectDifficulty(difficulty) {
        // TODO: fix possible buggy state
        this.setState({
            selected: difficulty.name,
            minesCount: countCellsInHexagon(this.state.fieldSize) * difficulty.minesPercentage | 0
        });
    }

    onNamedInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit() {
        if(this.state.load) {
            this.props.history.push('/play?load=true');
            return;
        }

        if (!this.state.formValid || !this.state.minesCount) {
            console.log(this.state.minesCount);
            toastr.warning('Enter valid values for the new game!');
            return;
        }

        const { fieldSize, minesCount, spectatable, load } = this.state,
            url = `/play?fieldSize=${fieldSize}&minesCount=${minesCount}&spectatable=${spectatable}`;
            
        this.props.history.push(url);
    }

    validateInputFieldSize(value) {
        if (!Number.isInteger(+value) || !(0 < +value && +value < 20)) {
            return { message: 'Must be between 1 and 20' };
        }
    }

    validateInputMinesCount(value) {
        if (!Number.isInteger(+value) || +value <= 0) {
            return { message: 'Must be between 1 and the field size' };
        }
    }

    onValidationFail() {
        this.setState({ formValid: false });
    }

    onValidationSuccess() {
        this.setState({ formValid: true });
    }

    render() {
        return (<div className={styles.gameSetupForm}>
            <form className={styles.difficultiesContainer}>
                <fieldset>
                    <div className={styles.inputGroup}>
                        <h3>Choose field size</h3>
                        <TextInput
                            name="fieldSize"
                            placeholder="Field size"
                            onChange={this.onNamedInputChange.bind(this)}
                            customValidate={this.validateInputFieldSize}
                            onValidationFail={this.onValidationFail.bind(this)}
                            onValidationSuccess={this.onValidationSuccess.bind(this)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <h3 className="inline-block">Spectatable</h3>
                        <span 
                            className={`custom-chkbox${this.state.spectatable ? ' checked' : ''} ${styles.chkbox}`}
                            onClick={() => this.setState({ spectatable: !this.state.spectatable })}></span>
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
                            customValidate={this.validateInputMinesCount}
                            onValidationFail={this.onValidationFail.bind(this)}
                            onValidationSuccess={this.onValidationSuccess.bind(this)}
                            onChange={this.onNamedInputChange.bind(this)} />
                    </div>
                </fieldset>
                <div className={styles.controls}>
                    <div className={styles.play}>
                        <div className={styles.hexagon + ' ' + styles.playBtn} onClick={this.onSubmit.bind(this)}>
                            Play
                    </div>
                    </div>
                    {
                        this.state.isLoggedUser ?
                            (<div className={styles.load}>
                                <div className={styles.hexagon + ' ' + styles.playBtn} onClick={() => { this.setState({ load: true }); setImmediate(this.onSubmit.bind(this)); }}>
                                    Load</div>
                            </div>)
                            : ''
                    }
                </div>
            </form>
        </div>);
    }
}
