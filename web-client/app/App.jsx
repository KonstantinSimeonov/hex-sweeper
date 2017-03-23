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
import PlayerGame from './Game/PlayerGame.jsx';
import GameSetupForm from './GameSetupForm/GameSetupForm.jsx';
import SpectatableGame from './Game/SpectatedGame.jsx';
import Timer from './Timer/Timer.jsx';
import SpectatableGamesList from './SpectatableGamesList/SpectatableGamesList.jsx';
import HighscoreForm from './HighscoreForm/HighscoreForm.jsx';
import PlayerRankings from './Rankings/PlayerRankings.jsx';
import Rankings from './Rankings/Rankings.jsx';
import Loader from './Loader/Loader.jsx';

import './styles/global.styl';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const RegForm = ({ history }) => <ModalWindow title="Join, play, top the rankings." history={history} children={<RegistrationForm history={history} />} />,
            LogForm = ({ history }) => <ModalWindow title="Here to sweep mines again?" history={history} children={<LoginForm history={history} />} />,
            HiScoreForm = ({ history }) => <ModalWindow title="How would you like to be known in the rankings?" children={<HighscoreForm history={history} />} history={history}/>,
            GameSetup = ({ history, location }) => <GameSetupForm history={history} location={location} />,
            GameComponent = ({ location, history }) => <PlayerGame location={location} history={history} />,
            SpectateListComponent = ({ history }) => <ModalWindow title="Watch other players live" history={history} children={<SpectatableGamesList history={history} />} />,
            SpectateGameComponent = ({ match, history }) => <SpectatableGame match={match} history={history} />,
            RankingsComponent = ({ }) => <Rankings />,
            PlayerRankingsComponent = () => <PlayerRankings />;

        return (
            <Router history={createBrowserHistory()}>
                <div>
                    <Route path="*" component={AppMenu} />
                    <main className="mainContent">
                        {/*<Route path="/" component={Loader} />*/}
                        <Route path="/register" component={RegForm} />
                        <Route path="/login" component={LogForm} />
                        <Route path="/newgame" component={GameSetup} />
                        <Route path="/play" component={GameComponent}/>
                        <Route path="/spectate" component={SpectateListComponent} />
                        <Route path="/spectate1/:id" component={SpectateGameComponent} />
                        <Route path="/highscore" component={HiScoreForm} />
                        <Route path="/rankings" component={Rankings} />
                        <Route path="/my-rankings" component={PlayerRankingsComponent} />
                    </main>
                </div>
            </Router>
        );
    }
}
