import { observable, action, autorun } from 'mobx';
import io from 'socket.io-client';

import generateField from '../logic/generate-field';

const ROW_MASK = (1 << 17) - 1;
const COL_MASK = (1 << 10) - 1;
const VALUE_MASK = (1 << 4) - 1;

function deserializeCellUpdate(cellUpdate) {
    return [(cellUpdate & ROW_MASK) >> 11, (cellUpdate & COL_MASK) >> 4, cellUpdate & VALUE_MASK];
}

class GameStore {
    @observable field = []
    @observable loading = false
    @observable gameStarted = true
    @observable startDate = null
    @observable win = null
    @observable messages = []

    constructor() {
        autorun(() => console.log(this.field));
    }

    connect = (options = {}, fieldSize, minesCount) => {
        const { serverDomain } = window.appConfig;
        const token = localStorage.getItem('token');
        options.token = token;

        this._socket = io(serverDomain, {
            transports: ['websocket'],
            query: options
        });

        this._socket
            .on('idAssigned', token => localStorage.setItem('token', token))
            .on('updates', this.update)
            .on('initGame:success', () => this.initGameSuccess(fieldSize))
            .on('save:success', () => this.messages.push('Game saved.'))
            .on('gameover', () => this.win = false)
            .on('win', () => this.win = true);

        this.initGame({ fieldSize, minesCount });
    }

    @action initGameSuccess(fieldSize) {
        this.loading = false;
        this.field = generateField({
            getCell: () => 0,
            getNullCell: () => null
        }, fieldSize);
        console.log(this);
    }

    update = action(updates => {
        const updatedRows = [];

        for (const serializedUpdate of updates) {
            const [row, col, value] = deserializeCellUpdate(serializedUpdate);
            if (!updatedRows[row]) {
                updatedRows[row] = this.field[row].slice();
            }

            updatedRows[row][col] = value;
        }

        for (let i = 0, length = this.field.length; i < length; i += 1) {
            if (!updatedRows[i]) {
                updatedRows[i] = this.field[i];
            }
        }

        console.log(updatedRows)

        this.field = updatedRows;
    })

    initGame = action(options => {
        this.loading = true;
        this._socket.emit('initGame', options);
    })

    saveGame = () => this._socket.emit('save')

    move = action((row, col) => {
        console.log(row, col);
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.startDate = Date.now();
        }

        this._socket.emit('move', { row, col });
    })
}

export default GameStore;
