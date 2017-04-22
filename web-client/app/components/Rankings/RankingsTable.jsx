'use strict';

import React from 'react';

import styles from './rankings.styl';

export default function RankingsTable(props) {
    return (
        <div className={styles.rankingsContainer}>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Field size</th>
                        <th>Mines count</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rankings.map((rank, position) => (
                            <tr key={position}>
                                <td>{position + 1}.</td>
                                <td>{rank.nickname ? rank.nickname : 'anonymous'}</td>
                                <td>{rank.fieldSize}</td>
                                <td>{rank.minesCount}</td>
                                <td>{Math.ceil(rank.time)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
