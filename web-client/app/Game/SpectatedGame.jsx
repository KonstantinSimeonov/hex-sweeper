'use strict';

import toastr from 'toastr';

import Game from './Game.jsx';

import generateFile from '../../../shared/generate-field.js';

export default class SpectatedGame extends Game {
    constructor(props) {
        super(props);

        console.log('here');
        const { match: { params: { id } } } = props
        
        this.connect({ type: 'spectate', id });
        this.socket
                .on('spectate:success', this.onSpectateSuccess.bind(this))
                .on('gameover', () => {
                    toastr.error('Boom. Lost!');
                    setTimeout(() => this.props.history.goBack(), 5000);
                })
                .on('win', () => {
                    toastr.success('Victory');
                    setTimeout(() => this.props.history.goBack(), 5000);
                });
                
        this.socket.emit('spectate', { id });
    }

    onSpectateSuccess({ size }) {
        const fieldGenOptions = { getCell() { return 0; }, getNullCell() { return null; } },
            field = generateFile(fieldGenOptions, size);

        this.setState({ field });
    }
}
