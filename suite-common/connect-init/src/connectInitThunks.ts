import { createThunk } from '@suite-common/redux-utils';
import detahardConnect, {
    BLOCKCHAIN_EVENT,
    DEVICE_EVENT,
    TRANSPORT_EVENT,
    UI_EVENT,
} from '@detahard/connect';

import { cardanoConnectPatch } from './cardanoConnectPatch';

const actionsPrefix = '@common/connect-init';

// If you are looking where connectInitSettings is defined, it is defined in packages/suite/src/support/extraDependencies.ts
// or in suite-native/state/src/extraDependencies.ts depends on which platform this connectInitThunk runs.

export const connectInitThunk = createThunk(
    `${actionsPrefix}/initThunk`,
    async (_, { dispatch, getState, extra }) => {
        const {
            selectors: {
                selectEnabledNetworks,
                selectIsPendingTransportEvent,
                selectDebugSettings,
            },
            actions: { lockDevice },
            utils: { connectInitSettings },
        } = extra;

        const getEnabledNetworks = () => selectEnabledNetworks(getState());

        // set event listeners and dispatch as
        detahardConnect.on(DEVICE_EVENT, ({ event: _, ...action }) => {
            // dispatch event as action
            dispatch(action);
        });

        detahardConnect.on(UI_EVENT, ({ event: _, ...action }) => {
            // dispatch event as action
            dispatch(action);
        });

        detahardConnect.on(TRANSPORT_EVENT, ({ event: _, ...action }) => {
            // dispatch event as action
            dispatch(action);
        });

        detahardConnect.on(BLOCKCHAIN_EVENT, ({ event: _, ...action }) => {
            // dispatch event as action
            dispatch(action);
        });

        const wrappedMethods = [
            'getFeatures',
            'getDeviceState',
            'getAddress',
            'ethereumGetAddress',
            'rippleGetAddress',
            'cardanoGetAddress',
            'applySettings',
            'changePin',
            'pushTransaction',
            'ethereumSignTransaction',
            'signTransaction',
            'rippleSignTransaction',
            'cardanoSignTransaction',
            'backupDevice',
            'recoveryDevice',
            'checkFirmwareAuthenticity',
            'authorizeCoinjoin',
            'getOwnershipProof',
            'setBusy',
        ] as const;

        wrappedMethods.forEach(key => {
            // typescript complains about params and return type, need to be "any"
            const original: any = detahardConnect[key];
            if (!original) return;
            (detahardConnect[key] as any) = async (params: any) => {
                dispatch(lockDevice(true));
                const result = await original(params);
                dispatch(lockDevice(false));
                return result;
            };
        });

        cardanoConnectPatch(getEnabledNetworks);

        try {
            await detahardConnect.init({
                ...connectInitSettings,
                pendingTransportEvent: selectIsPendingTransportEvent(getState()),
                transports: selectDebugSettings(getState()).transports,
            });
        } catch (error) {
            let formattedError: string;
            if (typeof error === 'string') {
                formattedError = error;
            } else {
                formattedError = error.code ? `${error.code}: ${error.message}` : error.message;
            }
            throw new Error(formattedError);
        }
    },
);
