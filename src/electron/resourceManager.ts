import osUtils from 'os-utils';
import os from 'os';
import fs from 'fs';
import { BrowserWindow } from 'electron';
// import { ipcWebContentsSend } from './util.js';

// const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
    console.log('mainWindow: ', mainWindow);
    // setInterval(async () => {
    //     const cpuUsage = await getCpuUsage();
    //     const ramUsage = getRamUsage();
    //     const { usage } = getStorageData();
    //     ipcWebContentsSend(
    //         'statistics',
    //         mainWindow.webContents,
    //         { cpuUsage, ramUsage, storageUsage: usage }
    //     );
    //     console.log({ cpuUsage, ramUsage, storageUsage: usage });
    // }, POLLING_INTERVAL);
}

export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return { totalStorage, cpuModel, totalMemoryGB };
}

// function getCpuUsage(): Promise<number> {
//     return new Promise((resolve) => {
//         osUtils.cpuUsage(resolve);
//     });
// }

// function getRamUsage(): number {
//     return 1 - osUtils.freememPercentage();
// }

function getStorageData(): { total: number; usage: number } {
    // requires node 18
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total,
    }
}