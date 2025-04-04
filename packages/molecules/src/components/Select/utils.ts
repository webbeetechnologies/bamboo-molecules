import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const selectStylesDefault = StyleSheet.create({
    root: {},
    container: {},
});

registerComponentsStyles({
    Select: selectStylesDefault,
});

export const selectStyles = getRegisteredMoleculesComponentStyles('Select');
