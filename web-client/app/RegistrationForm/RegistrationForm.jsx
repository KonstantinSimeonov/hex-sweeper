'use strict';

import React, { Component } from 'react';
import toastr from 'toastr';

import { post as httpPost } from '../utils/json-requester.js';

import TextInput from '../TextInput/TextInput.jsx';
import Loader from '../Loader/Loader.jsx';

import styles from './registration-form.styl';


export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '', loading: false };
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onClose() {
        this.props.history.push('/');
    }

    submit() {
        const { username, password } = this.state;
const { serverDomain } = window.appConfig;

        this.setState({ loading: true });

        httpPost(`${serverDomain}/api/users`, { user: { username, password } })
            .then(success => {
                toastr.success(`Registration successful! Redirecting to login screen...`);

                setTimeout(() => {
                    this.setState({ loading: false });
                    this.props.history.goBack();
                    this.props.history.push('/login');
                }, 2000);
            })
            .catch(error => {
                toastr.error('Registration failed! Please make sure your username and password are valid and try again.');
                setTimeout(() => this.setState({ loading: false }), 2000);
            });
    }

    render() {
        return (<div className={styles.form} onClick={event => event.preventDefault()}>
            <form>
                <fieldset>
                    <div>
                        <label htmlFor="username">Username</label>
                        <TextInput
                            name="username"
                            placeholder="Between 3 and 10 latin letters"
                            onChange={this.onChange.bind(this)}
                            pattern={/^[a-z]{3,10}\d{0,5}$/i}
                            patternErrorMessage="Only latin letters allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <TextInput
                            name="password"
                            type="password"
                            placeholder="Between 6 and 10 symbols"
                            onChange={this.onChange.bind(this)}
                        />
                    </div>
                </fieldset>
                <div className={styles.controls}>
                    {
                        this.state.loading ?
                            <Loader /> :
                            (
                                <div>
                                    <a className="custom-btn" onClick={this.submit.bind(this)}>Submit</a>
                                    <a className="custom-btn" onClick={this.onClose.bind(this)}>Close</a>
                                </div>
                            )
                    }
                </div>
            </form>
        </div>)
    }
}
