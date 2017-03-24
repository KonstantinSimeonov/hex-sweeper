'use strict';

const { app, BrowserWindow } = require('electron'),
    path = require('path'),
    url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow();
    win.maximize();

    win.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => win = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
