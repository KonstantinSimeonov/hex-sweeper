import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../actions';
import Menu from '../components/Menu.jsx';

function AppMenu({ username, dispatch }) {
    const menuItems = [
            { text: 'Play', href: '/newgame' },
            { text: 'Spectate', href: '/spectatable' },
            { text: 'Ranking', href: '/rankings' }
    ];

    if(username) {
        menuItems.push({ text: username, href: '/my-rankings' }, { text: 'Logout', onClick: () => dispatch(logoutUser()) });
    } else {
        menuItems.push({ text: 'Login', href: '/login' }, { text: 'Register', href: '/register' });
    }

    return <Menu menuItems={menuItems}/>;
}

const mapStateToProps = state => ({ username: state.users.username });

export default connect(mapStateToProps)(AppMenu);