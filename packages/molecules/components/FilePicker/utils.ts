import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const filePickerStylesDefault = StyleSheet.create({
    root: {},
});

registerComponentsStyles({
    FilePicker: filePickerStylesDefault,
});

export const defaultStyles = getRegisteredMoleculesComponentStyles('FilePicker');
