// testing build. yarn workspace @detahard/transport build:lib is a required step therefore
import detahardLink from '../../lib';
import messages from '../../messages.json';
import fetch from 'cross-fetch';
import { detahardUserEnvLink } from '@detahard/detahard-user-env-link';

const { BridgeV2 } = detahardLink;

// todo: introduce global jest config for e2e
jest.setTimeout(60000);

const mnemonicAll = 'all all all all all all all all all all all all';

const emulatorSetupOpts = {
    mnemonic: mnemonicAll,
    pin: '',
    passphrase_protection: false,
    label: 'detahardT',
    needs_backup: true,
};

const emulatorStartOpts = { version: '2-master', wipe: true };

describe('bridge', () => {
    beforeAll(async () => {
        await detahardUserEnvLink.connect();
    });

    afterAll(() => {
        detahardUserEnvLink.disconnect();
    });

    // there might be more versions of bridge out there, see https://github.com/detahard/webwallet-data/tree/master/bridge
    // but they are not available from detahard-user-env, see https://github.com/detahard/detahard-user-env/tree/master/src/binaries/detahardd-go/bin
    ['2.0.26', '2.0.27', undefined].forEach(bridgeVersion => {
        describe(bridgeVersion || 'latest', () => {
            let bridge: any;
            let devices: any[];
            let session: any;
            beforeEach(async () => {
                await detahardUserEnvLink.send({ type: 'bridge-stop' });
                await detahardUserEnvLink.send({ type: 'emulator-start', ...emulatorStartOpts });
                await detahardUserEnvLink.send({ type: 'emulator-setup', ...emulatorSetupOpts });
                await detahardUserEnvLink.send({ type: 'bridge-start', version: bridgeVersion });

                BridgeV2.setFetch(fetch, true);

                bridge = new BridgeV2(undefined, undefined);

                // this is how @detahard/connect is using it at the moment
                // bridge.setBridgeLatestVersion(bridgeVersion);

                await bridge.init(false);
                bridge.configure(messages);

                devices = await bridge.enumerate();

                expect(devices).toEqual([
                    {
                        path: '1',
                        session: null,
                        debugSession: null,
                        product: 0,
                        vendor: 0,
                        debug: true,
                    },
                ]);

                session = await bridge.acquire({ path: devices[0].path }, false);
            });

            test(`Call(GetFeatures)`, async () => {
                const message = await bridge.call(session, 'GetFeatures', {}, false);
                expect(message).toMatchObject({
                    type: 'Features',
                    message: {
                        vendor: 'detahard.io',
                        label: 'detahardT',
                    },
                });
            });

            test(`post(GetFeatures) - read`, async () => {
                const postResponse = await bridge.post(session, 'GetFeatures', {}, false);
                expect(postResponse).toEqual(undefined);

                const readResponse = await bridge.read(session, false);
                expect(readResponse).toMatchObject({
                    type: 'Features',
                    message: {
                        vendor: 'detahard.io',
                        label: 'detahardT',
                    },
                });
            });

            test(`call(ChangePin) - post(Cancel) - read`, async () => {
                // initiate change pin procedure on device
                const callResponse = await bridge.call(session, 'ChangePin', {}, false);
                expect(callResponse).toMatchObject({
                    type: 'ButtonRequest',
                });

                // cancel change pin procedure
                const postResponse = await bridge.post(session, 'Cancel', {}, false);
                expect(postResponse).toEqual(undefined);

                // read response
                const readResponse = await bridge.read(session, false);
                expect(readResponse).toMatchObject({
                    type: 'Failure',
                    message: {
                        code: 'Failure_ActionCancelled',
                        message: 'Cancelled',
                    },
                });

                // validate that we can continue with communication
                const message = await bridge.call(session, 'GetFeatures', {}, false);
                expect(message).toMatchObject({
                    type: 'Features',
                    message: {
                        vendor: 'detahard.io',
                        label: 'detahardT',
                    },
                });
            });

            test(`call(Backup) - post(Cancel) - read`, async () => {
                // initiate change pin procedure on device
                const callResponse = await bridge.call(session, 'BackupDevice', {}, false);
                expect(callResponse).toMatchObject({
                    type: 'ButtonRequest',
                });

                // cancel change pin procedure
                const postResponse = await bridge.post(session, 'Cancel', {}, false);
                expect(postResponse).toEqual(undefined);

                // read response
                const readResponse = await bridge.read(session, false);
                expect(readResponse).toMatchObject({
                    type: 'Failure',
                    message: {
                        code: 'Failure_ActionCancelled',
                        message: 'Cancelled',
                    },
                });

                // validate that we can continue with communication
                const message = await bridge.call(session, 'GetFeatures', {}, false);
                expect(message).toMatchObject({
                    type: 'Features',
                    message: {
                        vendor: 'detahard.io',
                        label: 'detahardT',
                    },
                });
            });
        });
    });
});
