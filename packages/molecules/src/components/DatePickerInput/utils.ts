import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const datePickerInputStylesDefault = StyleSheet.create({
    root: {
        minWidth: 150,
        justifyContent: 'center',
    },
});

registerComponentsStyles({
    datePickerInputStyles: datePickerInputStylesDefault,
});

export const datePickerInputStyles = getRegisteredMoleculesComponentStyles('datePickerInputStyles');
