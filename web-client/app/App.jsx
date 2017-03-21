'use strict';

import React, { Component } from 'react';
import { Router, Route, location } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory.js'

import $ from 'jquery';
import io from '../node_modules/socket.io-client/dist/socket.io.js';

import ModalWindow from './ModalWindow/ModalWindow.jsx';
import RegistrationForm from './RegistrationForm/RegistrationForm.jsx';
import LoginForm from './LoginForm/LoginForm.jsx';
import AppMenu from './AppMenu/AppMenu.jsx';
import Game from './Game/Game.jsx';
import GameSetupForm from './GameSetupForm/GameSetupForm.jsx';
import Timer from './Timer/Timer.jsx';
import SpectatableGamesList from './SpectatableGamesList/SpectatableGamesList.jsx';

import './styles/global.styl';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const RegForm = ({ history }) => <ModalWindow title="Join, play, top the rankings." history={history} children={<RegistrationForm history={history} />} />,
            LogForm = ({ history }) => <ModalWindow title="Welcome back." history={history} children={<LoginForm history={history} />} />,
            GameSetup = ({ history, location }) => <GameSetupForm history={history} location={location} />,
            GameComponent = ({ location }) => <Game location={location} />,
            SpectateComponent = ({ history }) => <ModalWindow title="Watch other players live" history={history} children={<SpectatableGamesList />} />;

        return (
            <Router history={createBrowserHistory()}>
                <div>
                    <Route path="*" component={AppMenu} />
                    <main className="mainContent">
                        <Route path="/" component={() => <div></div>} />
                        <Route path="/register" component={RegForm} />
                        <Route path="/login" component={LogForm} />
                        <Route path="/newgame" component={GameSetup} />
                        <Route path="/play" component={GameComponent}/>
                        <Route path="/spectate" component={SpectateComponent} />
                    </main>
                </div>
            </Router>
        );
    }
}
