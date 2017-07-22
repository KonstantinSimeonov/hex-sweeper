'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

import { fetchSpectatableGames } from '../actions';
import { get as httpGet } from '../utils/json-requester';

import Loader from '../components/Loader/Loader';
import GamesList from '../components/GamesList/GamesList';

class SpectatableGamesList extends Component {
    constructor(props) {
        super(props);

        props.dispatch(fetchSpectatableGames());
        // const { serverDomain } = window.appConfig;
        // this.state = {};

        // httpGet(`${serverDomain}/api/spectatable`)
        //     .then(spectatable => setTimeout(() => this.setState({ spectatable }), 1000))
        //     .catch(() => toastr.warning('Failed to fetch games from the remote server! Check your internet connection and try again.'));
    }

    render() {
        const { loading, games } = this.props;

        return (<div>
            {loading && <Loader />}
            {!loading && <GamesList games={games} />}
        </div>);
    }
}

const mapStateToProps = state => ({
    serverDomain: state.appConfig.serverDomain,
    loading: state.games.isLoading,
    games: state.games.spectatableGames
});

export default connect(mapStateToProps)(SpectatableGamesList);