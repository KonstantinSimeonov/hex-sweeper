'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './modal-window.styl';

export default class ModalWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => this.setState({ visibility: styles.visible }), 100);
    }

    render() {
        return (<div className="centered-container">
            <div className={styles.overlay} onClick={() => this.props.history.goBack()}></div>
            <dialog className={`${this.state.visibility} ${styles.modalWindow} inline-block width-33`}>
                <h3>{this.props.title}</h3>
                <div>{this.props.children}</div>
            </dialog>
        </div>)
    }
}
