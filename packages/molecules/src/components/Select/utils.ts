import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const selectStylesDefault = StyleSheet.create({
    root: {},
    container: {},
});

registerComponentsStyles({
    selectStyles: selectStylesDefault,
});

export const selectStyles = getRegisteredMoleculesComponentStyles('selectStyles');
