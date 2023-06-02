import { ActivityIndicator } from 'react-native';
import React from 'react';

import { useNativeStyles } from '@detahard/styles';
import { Color } from '@detahard/theme';

import { Box } from './Box';
import { Text } from './Text';

type LoaderProps = {
    title?: string;
    color?: Color;
};

// TODO: modify component to fit Figma design.
// issue: https://github.com/detahard/detahard-suite/issues/7538
export const Loader = ({ title, color = 'backgroundPrimaryDefault' }: LoaderProps) => {
    const {
        utils: { colors },
    } = useNativeStyles();
    return (
        <Box>
            <ActivityIndicator size="large" color={colors[color]} />
            {title && (
                <Text variant="label" color="textSubdued">
                    {title}
                </Text>
            )}
        </Box>
    );
};
