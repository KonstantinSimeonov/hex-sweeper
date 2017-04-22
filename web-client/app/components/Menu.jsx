'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

import styles from './app-menu.styl';

// const buttons = [
//     { text: 'Play', href: '/newgame' },
//     { text: 'Spectate', href: '/spectatable' },
//     { text: 'Ranking', href: '/rankings' }
// ],
//     buttonsWhenAnonymous = [{ text: 'Log in', href: '/login' }, { text: 'Register', href: '/register' }];

function renderLink({ text, href }) {
    return <Link to={href} className={styles.menuLink}>{text}</Link>
}

function renderButton({ text, onClick }) {
    return <a className={styles.menuLink} onClick={onClick}>{text}</a>
}

export default function Menu({ menuItems }) {
    return (
        <nav id="app-nav-menu" className={styles.appMenu}>
            <ul>
                {menuItems.map((mi, index) => (
                    <li key={index} className={styles.menuItem}>
                        {mi.onClick ? renderButton(mi) : renderLink(mi)}
                    </li>
                ))}
            </ul>
            <hr className={styles.bottomBorder} />
        </nav>
    );
}
