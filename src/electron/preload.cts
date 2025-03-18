import electron from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
    getAvailableTokens: () => ipcInvoke('get-available-tokens'),
    insertAvailableToken: (createToken: CreateAvailableToken) => ipcInvoke('insert-available-token', createToken),
    deleteAvailableToken: (id: string) => ipcInvoke('delete-available-token', id),
    getCopyableText: () => ipcInvoke('get-copyable-text'),
    insertCopyableText: (createCopyableText: CreateCopyableText) => ipcInvoke('insert-copyable-text', createCopyableText),
    deleteCopyableText: (id: string) => ipcInvoke('delete-copyable-text', id),

} satisfies Window['electron']);

function ipcInvoke<Key extends keyof EventPayloadMapping, TArgs>(
    key: Key,
    args?: TArgs
): Promise<EventPayloadMapping[Key]> {
    return args
        ? electron.ipcRenderer.invoke(key, args)
        : electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
    key: Key,
    callback: (payload: EventPayloadMapping[Key]) => void
) {
    const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}
