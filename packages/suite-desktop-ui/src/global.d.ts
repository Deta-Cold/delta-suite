type detahardConnectIpcChannel = (method: string, ...params: any[]) => Promise<any>;

interface Window {
    detahardConnectIpcChannel?: detahardConnectIpcChannel; // Electron API
}
