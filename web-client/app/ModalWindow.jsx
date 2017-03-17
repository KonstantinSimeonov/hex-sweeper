'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './styles/modal-window.styl';

export default class ModalWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    close() {
        const parent = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.unmountComponentAtNode(parent);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ visibility: styles.visible }), 100);
    }

    render() {
        const children = this.props.getChildren(this.close.bind(this));
        return (<div className="centered-container">
                    <div className={styles.overlay} onClick={() => this.close()}></div>
                    <dialog className={ this.state.visibility + ' ' + styles.modalWindow + ' inline-block width-33'}>
                        <h3>{this.props.title}</h3>
                        {this.props.text ? <p>{this.props.text}</p> : ''}
                        <div>
                            {children}
                        </div>
                    </dialog>
                </div>)
    }
}