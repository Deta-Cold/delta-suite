import { contextBridge, ipcRenderer } from 'electron';

import { exposeIpcProxy } from '@detahard/ipc-proxy';
import { getDesktopApi } from '@detahard/suite-desktop-api';

import '@sentry/electron/preload'; // With this only IPCMode.Classic is ever taken into account

contextBridge.exposeInMainWorld(
    ...exposeIpcProxy(ipcRenderer, ['detahardConnect', 'CoinjoinBackend', 'CoinjoinClient']),
);

const desktopApi = getDesktopApi(ipcRenderer);
contextBridge.exposeInMainWorld('desktopApi', desktopApi);
