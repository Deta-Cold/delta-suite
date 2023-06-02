import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createRenderer, StylesProvider } from '@detahard/styles';
import { prepareNativeTheme } from '@detahard/theme';

type ProviderProps = {
    children: React.ReactNode;
};
const renderer = createRenderer();
const theme = prepareNativeTheme({ colorVariant: 'standard' });

export const Provider = ({ children }: ProviderProps) => (
    <SafeAreaProvider>
        <StylesProvider theme={theme} renderer={renderer}>
            {children}
        </StylesProvider>
    </SafeAreaProvider>
);
