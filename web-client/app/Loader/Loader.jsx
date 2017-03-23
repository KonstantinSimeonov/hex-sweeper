'use strict';

import React from 'react';

import styles from './loader.styl';

export default function Loader(props) {
    return (
        <div className="loader">
            <div className="loader__figure"></div>
            <p className="loader__label">Loading...</p>
        </div>
    );
}
