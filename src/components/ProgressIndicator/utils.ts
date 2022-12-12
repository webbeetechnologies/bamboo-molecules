import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet, ViewStyle } from 'react-native';

type CustomProps = {
    color?: string;
    trackColor?: string;
};

type States = '';

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {
    variants: {
        bar: {
            color: 'colors.primary',
            trackColor: 'colors.surfaceVariant',
        },
        circle: {},
    },
};

export const styles = StyleSheet.create({});
