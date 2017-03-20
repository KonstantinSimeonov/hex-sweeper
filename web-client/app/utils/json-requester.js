'use strict';

import $ from 'jquery';

export function get(url, query) {
    const queryString = Object.prototype.toString.call(query) === '[object Object]' ? Object.entries(query).map(([key, value]) => key + '=' + value).join('&') : '',
        queryUrl = url + queryString;

    return new Promise((resolve, reject) => {
        $.ajax(queryUrl, {
            method: 'GET',
            contentType: 'application/json',
            success: resolve,
            error: (...args) => reject(args)
        });
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax(url, {
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: resolve,
            error: (...args) => reject(args)
        });
    });
}