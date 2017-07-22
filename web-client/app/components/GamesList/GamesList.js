// @flow

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './games-list.styl';

/* <T>(a: T, b: T): Array<T> */
function join(a, b) {
    return [a, b];
}

export default class GamesList extends React.Component {
    static propTypes = {
        games: PropTypes.arrayOf(PropTypes.string).isRequired
    }

    _gameIdToLink(gameId: string) {
        return (
            <li key={gameId}>
                <Link to={`/spectate/${gameId}`}>
                    {gameId}
                </Link>
            </li>
        );
    }

    render() {
        const games /* :string[] */ = this.props.games;

        games.map(x => x / 5)

        return (
            <div className={styles.spectatableContainer}>
                <ul className={styles.gamesList}>{games.map(this._gameIdToLink)}
                </ul>
            </div>
        );
    }
}
