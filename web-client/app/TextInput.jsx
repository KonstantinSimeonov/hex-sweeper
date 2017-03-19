'use strict';

import React, { Component } from 'react';

import styles from './styles/text-input.styl'

export default class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = { currentError: { message: '' }, isValid: true };
    }

    onChange(event) {
        this.validate(event);
        this.props.onChange(event);
    }

    validate(event) {
        event.preventDefault();

        const valueToValidate = event.target.value,
            { pattern, patternErrorMessage } = this.props;

        if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
            if (!pattern.test(valueToValidate)) {
                this.setState({ currentError: { message: patternErrorMessage }, isValid: false });
                return;
            }

        }

        this.setState({ currentError: { message: '' }, isValid: true });
    }

    render() {


        return (<div className={this.props.className + ' ' + styles.textInputContainer + ' bottom-border-animated'}>
            <input type={this.props.type || 'text'} name={this.props.name} onChange={this.onChange.bind(this)} placeholder={this.props.placeholder} />
            <span className={'textInputError' + (this.state.isValid ? ' hidden' : '')}>{this.state.currentError.message}</span>
        </div>)
    }
}
