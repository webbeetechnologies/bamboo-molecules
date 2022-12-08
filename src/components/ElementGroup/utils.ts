import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet } from 'react-native';

export const elementGroupStyles: ComponentStylePropWithVariants<TextStyle> = {};

export const defaultStyles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
    },
    vertical: {
        flexDirection: 'column',
    },
});
