import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const stateLayerStylesDefault = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        zIndex: -1,
    },
});

registerComponentsStyles({
    stateLayerStyles: stateLayerStylesDefault,
});

export const stateLayerStyles = getRegisteredMoleculesComponentStyles('stateLayerStyles');
