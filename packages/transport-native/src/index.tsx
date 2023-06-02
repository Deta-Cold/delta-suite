import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
    `The package '@detahard/transport-native' doesn't seem to be linked. Make sure: \n\n${Platform.select(
        { ios: "- You have run 'pod install'\n", default: '' },
    )}- You rebuilt the app after installing the package\n` +
    `- You are not using Expo managed workflow\n`;

const detahardTransport =
    NativeModules.detahardTransport ??
    new Proxy(
        {},
        {
            get() {
                throw new Error(LINKING_ERROR);
            },
        },
    );

type DevicePath = string;
type Data = string;
interface detahardDeviceInfoDebug {
    path: DevicePath;
    debug: boolean;
}

export const enumerate = (): Promise<detahardDeviceInfoDebug[]> => detahardTransport.enumerate();

export const acquire = (path: DevicePath, debugLink: boolean): Promise<void> =>
    detahardTransport.acquire(path, debugLink);

export const release = (path: DevicePath, debugLink: boolean, closePort: boolean): Promise<void> =>
    detahardTransport.release(path, debugLink, closePort);

export const write = (path: DevicePath, debugLink: boolean, data: Data): Promise<void> =>
    detahardTransport.write(path, debugLink, data);

export const read = (path: DevicePath, debugLink: boolean): Promise<{ data: Data }> =>
    detahardTransport.read(path, debugLink);
