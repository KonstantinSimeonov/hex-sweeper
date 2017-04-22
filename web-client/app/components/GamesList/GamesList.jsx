'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './games-list.styl';

export default function GamesList({ games }) {
    return (
        <div className={styles.spectatableContainer}>
            <ul className={styles.gamesList}>{games.map(gameId =>
                <li key={gameId}>
                    <Link to={`/spectate/${gameId}`}>
                        {gameId}
                    </Link>
                </li>)}
            </ul>
        </div>
    );
}