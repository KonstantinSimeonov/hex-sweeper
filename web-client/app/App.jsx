'use strict';

import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory.js'

import $ from 'jquery';
import io from '../node_modules/socket.io-client/dist/socket.io.js';

import ModalWindow from './ModalWindow.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import LoginForm from './LoginForm.jsx';
import TextInput from './TextInput.jsx'
import AppMenu from './AppMenu.jsx';
import MineField from './MineField.jsx';

import './styles/global.styl';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const RegForm = ({ history }) => <ModalWindow title="Join, play, top the rankings." history={history} children={<RegistrationForm history={history}/>}/>,
            LogForm = ({ history }) => <ModalWindow title="Welcome back." history={history} children={<LoginForm history={history} />} />;

        return (
            <Router history={createBrowserHistory()}>
                <div>
                    <AppMenu />
                    <Route path="/" component={() => <div></div>} />
                    <Route path="/register" component={RegForm} />
                    <Route path="/login" component={LogForm} />
                </div>
            </Router>
        );
    }
}