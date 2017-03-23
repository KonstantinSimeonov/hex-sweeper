'use strict';

import React, { Component } from 'react';
import toastr from 'toastr';

import { post } from '../utils/json-requester.js';

import Loader from '../Loader/Loader.jsx';
import TextInput from '../TextInput/TextInput.jsx';

import styles from './login-form.styl';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '', loading: false };
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit() {
        const { username, password } = this.state;

        this.setState({ loading: true });

        post('http://localhost:6969/api/authenticate', { user: { username, password } })
            .then(response => {
                toastr.success(`Welcome, ${username}!`);

                localStorage.setItem('token', response.token);
                localStorage.setItem('username', username);

                const loggedInEvent = new CustomEvent('login', { detail: username });
                window.dispatchEvent(loggedInEvent);

                setTimeout(() => this.props.history.goBack(), 2000);
            })
            .catch(error => {
                toastr.error('Login not successful! Make sure your credentials are correct and try again.');

                setTimeout(() => this.setState({ loading: false }), 2000);
                console.log(error);
            });
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
                <div className={styles.controls}>
                    {
                        this.state.loading ?
                            <Loader /> :
                            (<div>
                                <a className="custom-btn" onClick={this.submit.bind(this)}>Submit</a>
                                <a className="custom-btn" onClick={() => this.props.history.goBack()}>Close</a>
                            </div>)
                    }
                </div>
            </form>
        </div>)
    }
}