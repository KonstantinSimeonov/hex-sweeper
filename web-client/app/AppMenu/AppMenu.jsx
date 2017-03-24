'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

import styles from './app-menu.styl';

const buttons = [
    { text: 'Play', href: '/newgame' },
    { text: 'Spectate', href: '/spectatable' },
    { text: 'Ranking', href: '/rankings' }
],
    buttonsWhenAnonymous = [{ text: 'Log in', href: '/login' }, { text: 'Register', href: '/register' }];

export default class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { username: localStorage.getItem('username') || '' };

        if (this.state.username) {
            this.state.buttons = buttons.concat([{ text: this.state.username, href: '/my-rankings' }]);
        } else {
            this.state.buttons = buttons.concat(buttonsWhenAnonymous);
        }

        window.addEventListener('login', ({ detail: username }) => {
            const newButtons = buttons.concat([{ text: username, href: '/my-rankings' }]);

            this.setState({ buttons: newButtons, username: localStorage.getItem('username') });
        });
    }

    logout() {
        toastr.success('Sad to see you go :(');

        localStorage.removeItem('token');
        localStorage.removeItem('username');

        setTimeout(() => {
            this.setState({ buttons: buttons.concat(buttonsWhenAnonymous), username: '' });
            this.props.history.push('/login')
        }, 1000);
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
