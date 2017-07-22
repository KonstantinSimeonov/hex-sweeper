import React, { Component } from 'react';
import { connect } from 'react-redux';

import RankingsTable from '../components/Rankings/RankingsTable';
import { fetchRankings } from '../actions/index';

class Rankings extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, username, forCurrentUser } = this.props;
        dispatch(fetchRankings(forCurrentUser ? username : undefined));
    }

    render() {
        const { rankings } = this.props;
        return <RankingsTable rankings={rankings} />;
    }
}

const mapStateToProps = state => ({ username: state.users.username, rankings: state.rankings.rankings });

export default connect(mapStateToProps)(Rankings);
