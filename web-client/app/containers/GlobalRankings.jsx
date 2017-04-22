import React, { Component } from 'react';
import { connect } from 'react-redux';

import RankingsTable from '../Rankings/Rankings.jsx';
import { fetchRankings } from '../actions/index';

class Rankings extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, token } = this.props;
        dispatch(fetchRankings(token));
    }

    render() {
        const { rankings } = this.props;
        return <RankingsTable rankings={rankings} />;
    }
}

const mapStateToProps = state => ({ token: state.token });

export default connect(mapStateToProps)(Rankings);
