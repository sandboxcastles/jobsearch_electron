import { app, BrowserWindow } from 'electron';
import { ipcHandle, ipcHandleWithArgs, isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import db from './db/index.js';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1900,
        height: 1080,
        webPreferences: {
            preload: getPreloadPath(),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(getUIPath());
    }
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
    ipcHandle('get-available-tokens', () => db.availableTokens.getAll());
    ipcHandleWithArgs('insert-available-token', (createToken: CreateAvailableToken) => db.availableTokens.create(createToken));
    ipcHandleWithArgs('delete-available-token', (id: string) => db.availableTokens.delete(id));
    ipcHandle('get-copyable-text', () => db.copyableText.getAll());
    ipcHandleWithArgs('insert-copyable-text', (createCopyableText: CreateCopyableText) => db.copyableText.create(createCopyableText));
    ipcHandleWithArgs('delete-copyable-text', (id: string) => db.copyableText.delete(id));
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
