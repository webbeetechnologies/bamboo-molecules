import type { ComponentStylePropWithVariants } from '../../../types';
import { StyleSheet, ViewStyle } from 'react-native';

type CustomProps = {
    color?: string;
    trackColor?: string;
    animationScale?: string | number;
    thickness?: string | number;
    text: {
        color?: string;
    };
};

type States = '';

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {
    width: 48,
    thickness: 4,
    color: 'colors.primary',
    trackColor: 'colors.surfaceVariant',
    animationScale: 'animation.scale',
    text: {
        color: 'colors.primary',
    },
};

export const styles = StyleSheet.create({});
