import detahardConnect from '@detahard/connect';

type ConnectKey = keyof typeof detahardConnect;

// List of methods that doesn't work with additional `useCardanoDerivation` param
// (eg. because they don't accept options object as a param)
// or they don't trigger seed derivation on a device so there is no need to pass it.
const blacklist: ConnectKey[] = [
    'manifest',
    'init',
    'getSettings',
    'on',
    'off',
    'removeAllListeners',
    'uiResponse',
    'blockchainGetAccountBalanceHistory',
    'blockchainGetCurrentFiatRates',
    'blockchainGetFiatRatesForTimestamps',
    'blockchainDisconnect',
    'blockchainEstimateFee',
    'blockchainGetTransactions',
    'blockchainSetCustomBackend',
    'blockchainSubscribe',
    'blockchainSubscribeFiatRates',
    'blockchainUnsubscribe',
    'blockchainUnsubscribeFiatRates',
    'requestLogin',
    'getCoinInfo',
    'dispose',
    'cancel',
    'renderWebUSBButton',
    'disableWebUSB',
];

export const cardanoConnectPatch = (getEnabledNetworks: () => string[]) => {
    // Pass additional parameter `useCardanoDerivation` to detahard Connect methods
    // in order to enable cardano derivation on a device
    // https://github.com/detahard/detahard-firmware/blob/master/core/src/apps/cardano/README.md#seed-derivation-schemes
    Object.keys(detahardConnect)
        .filter(k => !blacklist.includes(k as ConnectKey))
        .forEach(key => {
            // typescript complains about params and return type, need to be "any"
            const original: any = detahardConnect[key as ConnectKey];
            if (!original) return;
            (detahardConnect[key as ConnectKey] as any) = async (params: any) => {
                const enabledNetworks = getEnabledNetworks();
                const cardanoEnabled = !!enabledNetworks.find(a => a === 'ada' || a === 'tada');
                const result = await original({
                    ...params,
                    useCardanoDerivation: cardanoEnabled,
                });
                return result;
            };
        });
};
