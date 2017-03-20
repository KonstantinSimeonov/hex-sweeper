'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import styles from './app-menu.styl';

const buttons = [
    { text: 'Play', href: 'newgame' },
    { text: 'Spectate', href: 'spectate' },
    { text: 'Ranking', href: 'hall-of-fame' }
],
    buttonsWhenAnonymous = [
        { text: 'Log in', href: 'login' }, { text: 'Register', href: 'register' }
    ];

export default class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username') || ''
        };

        if (this.state.username) {
            this.state.buttons = buttons.concat([{ text: this.state.username, href: this.state.username }]);
        } else {
            this.state.buttons = buttons.concat(buttonsWhenAnonymous);
        }

        window.addEventListener('login', ({ detail: username }) => {
            const newButtons = buttons.concat([{ text: username, href: username }]);

            this.setState({ buttons: newButtons, username: localStorage.getItem('username') });
        });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        this.setState({ buttons: buttons.concat(buttonsWhenAnonymous), username: '' });
    }

    render() {
        return (
            <nav id="app-nav-menu" className={styles.appMenu}>
                <ul>
                    {this.state.buttons.map(button => (
                        <li key={button.href} className={styles.menuItem}>
                            <Link to={button.href} className={styles.menuLink}>{button.text}</Link>
                        </li>
                    ))}
                    {this.state.username ? <li className={styles.menuItem}><a className={styles.menuLink} onClick={this.logout.bind(this)}>Logout</a></li> : ''}
                </ul>
                <hr className={styles.bottomBorder} />
            </nav>
        );
    }
}
