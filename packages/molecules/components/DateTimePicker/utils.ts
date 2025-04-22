import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const dateTimePickerStylesDefault = StyleSheet.create({
    container: {},
});

registerComponentsStyles({
    DateTimePicker: dateTimePickerStylesDefault,
});

export const dateTimePickerStyles = getRegisteredMoleculesComponentStyles('DateTimePicker');
