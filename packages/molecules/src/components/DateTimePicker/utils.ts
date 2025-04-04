import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const dateTimePickerStylesDefault = StyleSheet.create({
    container: {},
});

registerComponentsStyles({
    dateTimePickerStyles: dateTimePickerStylesDefault,
});

export const dateTimePickerStyles = getRegisteredMoleculesComponentStyles('dateTimePickerStyles');
