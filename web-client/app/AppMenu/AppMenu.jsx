'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import styles from './app-menu.styl';

export default class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [
                { text: 'Play', href: 'play' },
                { text: 'Ranking', href: 'hall-of-fame' },
                { text: 'Register', href: 'register' },
                { text: 'Log in', href: 'login' },
                { text: 'Spectate', href: 'spectate' }
            ]
        };

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
                </ul>
                <hr className={styles.bottomBorder} />
            </nav>
        );
    }
}
