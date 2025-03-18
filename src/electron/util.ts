import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from 'url';

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
    key: Key,
    handler: () => EventPayloadMapping[Key]
) {
    ipcMain.handle(key, async (event) => {
        validateEventFrame(event.senderFrame);
        return handler();
    });
}

export function ipcHandleWithArgs<Key extends keyof EventPayloadMapping, TArgs>(
    key: Key,
    handler: (args: TArgs) => EventPayloadMapping[Key]
) {
    ipcMain.handle(key, async (event, args) => {
        validateEventFrame(event.senderFrame);
        return handler(args);
    });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    webContents: WebContents,
    payload: EventPayloadMapping[Key]
): void {
    webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain | null): void {
    if (!frame) {
        throw new Error('No event frame!');
    }
    if (isDev() && new URL(frame.url).host === 'localhost:5123') {
        return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Malicious event!');
    }
}