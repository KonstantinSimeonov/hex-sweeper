'use strict';

import React, { Component } from 'react';
import { post } from './utils/json-requester.js';

import styles from './styles/registration-form.styl';

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit() {
        const { username, password } = this.state;

        post('http://localhost:6969/api/users', { user: { username, password } })
            .then(success => {
                console.log(success);
                this.props.close();
            })
            .catch(console.log);
    }

    render() {
        return (<div className={styles.form} onClick={event => event.preventDefault()}>
            <form>
                <fieldset>
                    <div>
                        <label htmlFor="username">Username</label>
                        <div className="bottom-border-animated">
                            <input id="username" type="text" name="username" onChange={this.onChange.bind(this)} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="bottom-border-animated">
                            <input id="password" type="text" name="password" onChange={this.onChange.bind(this)} />
                        </div>
                    </div>
                </fieldset>
                <div>
                    <a className="custom-btn" onClick={this.submit.bind(this)}>Submit</a>
                    <a className="custom-btn" onClick={this.props.close}>Close</a>
                </div>
            </form>
        </div>)
    }
}