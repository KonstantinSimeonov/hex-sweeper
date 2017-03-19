'use strict';

import React, { Component } from 'react';
import $ from 'jquery';


import styles from './styles/app-menu.styl';

export class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [
                { text: 'Play', href: 'play', click: this.props.startGame },
                { text: 'Ranking', href: 'hall-of-fame' },
                { text: 'Register', href: 'register', click: this.props.register },
                { text: 'Log in', href: 'login', click: this.props.login },
                { text: 'Spectate', href: 'spectate' }
            ]
        };

    }

    render() {
        const menuLinks = this.state
                                .buttons
                                .map(btnInfo => <li key={btnInfo.href} onClick={btnInfo.click} className={styles.menuItem}>
                                                    <a className={styles.menuLink} href={'#' + btnInfo.href}>{btnInfo.text}
                                                    </a></li>);

        return (<nav id="app-nav-menu" className={styles.appMenu}><ul>{menuLinks}</ul><hr className={styles.bottomBorder} /></nav>);
    }
}
