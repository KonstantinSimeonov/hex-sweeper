'use strict';

import React, { Component } from 'react';
import { Router, Route, location } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory.js'

import $ from 'jquery';
import io from '../node_modules/socket.io-client/dist/socket.io.js';

import ModalWindow from './components/ModalWindow/ModalWindow';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';
import AppMenu from './containers/AppMenu';
import Game from './Game/Game';
import GameSetupForm from './GameSetupForm/GameSetupForm';
import SpectatableGame from './Game/SpectatedGame';
import Timer from './components/Timer/Timer';
import SpectatableGamesList from './containers/SpectatableGamesList';
import HighscoreForm from './HighscoreForm/HighscoreForm';
import Loader from './components/Loader/Loader';
import Rankings from './containers/Rankings';

import './styles/global.styl';

import AppStore from './stores/app-store';

import GameStore from './stores/game-store';

export default function App(props) {
    const RegForm = ({ history }) => (
        <ModalWindow
            title="Join, play, top the rankings." history={history}>
            <RegistrationForm history={history} />
        </ModalWindow>
    ),
        LogForm = ({ history }) => (
            <ModalWindow
                title="Here to sweep mines again?" history={history}>
                <LoginForm store={AppStore} />
            </ModalWindow>
        ),
        HiScoreForm = ({ history }) => (
            <ModalWindow
                title="How would you like to be known in the rankings?" history={history}>
                <HighscoreForm history={history} />
            </ModalWindow>
        ),
        SpectateListComponent = ({ history }) => (
            <ModalWindow title="Watch other players live" history={history}>
                <SpectatableGamesList history={history} />
            </ModalWindow>
        ),
        GameSetup = ({ history, location }) => <GameSetupForm history={history} location={location} />,
        GameComponent = ({ location, history }) => <Game location={location} history={history} store={new GameStore()} />,
        SpectatableGames = ({ match, history }) => <SpectatableGame match={match} history={history} />,
        RankingsComponent = () => <Rankings />,
        PlayerRankingsComponent = () => <Rankings forCurrentUser={true} />;

    return (
        <Router history={createBrowserHistory()}>
            <div>
                <Route path="*" component={AppMenu} />
                <main className="mainContent">
                    <Route path="/register" component={RegForm} />
                    <Route path="/login" component={LogForm} />
                    <Route path="/newgame" component={GameSetup} />
                    <Route path="/play" component={GameComponent} />
                    <Route path="/spectatable" component={SpectateListComponent} />
                    <Route path="/spectate/:id" component={SpectatableGames} />
                    <Route path="/highscore" component={HiScoreForm} />
                    <Route path="/rankings" component={RankingsComponent} />
                    <Route path="/my-rankings" component={PlayerRankingsComponent} />
                </main>
            </div>
        </Router>
    );
}
