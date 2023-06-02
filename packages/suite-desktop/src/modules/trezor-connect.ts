import { app, ipcMain } from 'electron';

import detahardConnect from '@detahard/connect';
import { createIpcProxyHandler, IpcProxyHandlerOptions } from '@detahard/ipc-proxy';

import type { Module } from './index';

const SERVICE_NAME = '@detahard/connect';

export const init: Module = ({ store }) => {
    const { logger } = global;
    logger.info(SERVICE_NAME, `Starting service`);

    const setProxy = (ifRunning = false) => {
        const tor = store.getTorSettings();
        if (ifRunning && !tor.running) return Promise.resolve();
        const payload = tor.running ? { proxy: `socks://${tor.host}:${tor.port}` } : { proxy: '' };
        logger.info(SERVICE_NAME, `${tor.running ? 'Enable' : 'Disable'} proxy ${payload.proxy}`);
        return detahardConnect.setProxy(payload);
    };

    const ipcProxyOptions: IpcProxyHandlerOptions<typeof detahardConnect> = {
        onCreateInstance: () => ({
            onRequest: async (method, params) => {
                logger.debug(SERVICE_NAME, `call ${method}`);
                if (method === 'init') {
                    const response = await detahardConnect[method](...params);
                    await setProxy(true);
                    return response;
                }
                return (detahardConnect[method] as any)(...params);
            },
            onAddListener: (eventName, listener) => {
                logger.debug(SERVICE_NAME, `Add event listener ${eventName}`);
                return detahardConnect.on(eventName, listener);
            },
            onRemoveListener: eventName => {
                logger.debug(SERVICE_NAME, `Remove event listener ${eventName}`);
                return detahardConnect.removeAllListeners(eventName);
            },
        }),
    };

    const unregisterProxy = createIpcProxyHandler(ipcMain, 'detahardConnect', ipcProxyOptions);

    app.on('before-quit', () => {
        unregisterProxy();
        detahardConnect.dispose();
    });

    return () => {
        // reset previous instance, possible left over after renderer refresh (F5)
        detahardConnect.dispose();
    };
};
