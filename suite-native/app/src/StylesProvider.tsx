import React from 'react';

import { createRenderer, StylesProvider as StylesStyleProvider } from '@detahard/styles';
import { prepareNativeTheme } from '@detahard/theme';
import { useActiveColorScheme } from '@suite-native/theme';

type StylesProviderProps = {
    children: React.ReactNode;
};

const renderer = createRenderer();

export const StylesProvider = ({ children }: StylesProviderProps) => {
    const colorVariant = useActiveColorScheme();
    const theme = prepareNativeTheme({ colorVariant });

    return (
        <StylesStyleProvider theme={theme} renderer={renderer}>
            {children}
        </StylesStyleProvider>
    );
};
