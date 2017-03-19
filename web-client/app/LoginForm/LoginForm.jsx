'use strict';

import React, { Component } from 'react';

import TextInput from '../TextInput/TextInput.jsx';
import styles from './login-form.styl';

import { post } from '../utils/json-requester.js';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '' }
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit() {
        const { username, password } = this.state;
        post('http://localhost:6969/api/authenticate', { user: { username, password } })
            .then(response => {
                localStorage.setItem('token', response.token);
                console.log(response);
            })
            .catch(console.log);
    }

    render() {
        return (<div className={styles.loginForm} onClick={event => event.preventDefault()}>
            <form>
                <fieldset>
                    <div>
                        <TextInput
                            name="username"
                            placeholder="Username"
                            onChange={this.onChange.bind(this)}
                            pattern={/^[a-z]{3,10}\d{0,5}$/i}
                            patternErrorMessage="Only latin letters allowed"
                        />
                    </div>
                    <div>
                        <TextInput
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.onChange.bind(this)}
                        />
                    </div>
                </fieldset>
                <div>
                    <a className="custom-btn" onClick={this.submit.bind(this)}>Submit</a>
                    <a className="custom-btn" onClick={() => this.props.history.goBack()}>Close</a>
                </div>
            </form>
        </div>)
    }
}