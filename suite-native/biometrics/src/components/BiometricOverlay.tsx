import React from 'react';
import { StyleSheet } from 'react-native';

import { Box } from '@suite-native/atoms';
import { prepareNativeStyle, useNativeStyles } from '@detahard/styles';
import { Icon } from '@suite-common/icons';

const overlayWrapperStyle = prepareNativeStyle(utils => ({
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: utils.colors.backgroundTertiaryDefaultOnElevation0,
}));

export const BiometricOverlay = () => {
    const { applyStyle } = useNativeStyles();

    return (
        <Box style={applyStyle(overlayWrapperStyle)}>
            <Icon name="detahard" size="extraLarge" color="iconOnPrimary" />
        </Box>
    );
};
