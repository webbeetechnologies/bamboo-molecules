import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const filePickerStylesDefault = StyleSheet.create({});

registerComponentsStyles({
    filePickerStyles: filePickerStylesDefault,
});

export const defaultStyles = getRegisteredMoleculesComponentStyles('filePickerStyles');
