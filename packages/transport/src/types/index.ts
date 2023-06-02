export * as Messages from './messages';

// does not have session
export type detahardDeviceInfo = {
    path: string;
};

export type detahardDeviceInfoWithSession = detahardDeviceInfo & {
    session?: string | null;
    debugSession?: string | null;
    debug: boolean;
};

export type AcquireInput = {
    path: string;
    previous?: string;
};

export type MessageFromdetahard = { type: string; message: Record<string, unknown> };

export type Transport = {
    enumerate(): Promise<Array<detahardDeviceInfoWithSession>>;
    listen(old?: Array<detahardDeviceInfoWithSession>): Promise<Array<detahardDeviceInfoWithSession>>;
    acquire(input: AcquireInput, debugLink: boolean): Promise<string>;
    release(session: string, onclose: boolean, debugLink?: boolean): Promise<void>;
    configure(signedData: JSON | string): Promise<void>;
    call(
        session: string,
        name: string,
        data: Record<string, unknown>,
        debugLink: boolean,
    ): Promise<MessageFromdetahard>;
    post(
        session: string,
        name: string,
        data: Record<string, unknown>,
        debugLink: boolean,
    ): Promise<void>;
    read(session: string, debugLink: boolean): Promise<MessageFromdetahard>;
    // resolves when the transport can be used; rejects when it cannot
    init(debug?: boolean): Promise<void>;
    stop(): void;
    configured: boolean;
    version: string;
    name: string;
    requestNeeded: boolean;
    isOutdated: boolean;
    setBridgeLatestUrl(url: string): void;
    setBridgeLatestVersion(version: string): void;
    activeName?: string;

    // webusb has a different model, where you have to
    // request device connection
    requestDevice: () => Promise<void>;
};
