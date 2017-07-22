import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { get as httpGet, post as httpPost } from '../utils/json-requester';

import MineField from './MineField';
import Timer from '../components/Timer/Timer';
import Loader from '../components/Loader/Loader';

import styles from './game.styl';

@observer
export default class Game extends Component {
    componentWillMount() {
        this.props.store.connect({}, 8, 20);
}

    componentWillUnmount() {
        this.props.store._socket.disconnect();
    }

    render() {
        const { loading, field, gameStarted, startDate, move } = this.props.store;

        return (
            <div>
                {loading && <Loader />}
                <div className={styles.gameContainer + (loading ? '' : styles.active)}>
                    <div>
                        {gameStarted && <Timer startDate={startDate} frozen={!gameStarted} />}
                    </div>
                    <MineField field={field} onCellClick={move} />
                </div>
            </div>
        );
    }
}
