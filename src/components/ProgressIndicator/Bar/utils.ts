import type { ComponentStylePropWithVariants } from '../../../types';
import { StyleSheet, ViewStyle } from 'react-native';

type CustomProps = {
    color?: string;
    trackColor?: string;
    animationScale?: string | number;
};

type States = '';

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {
    color: 'colors.primary',
    trackColor: 'colors.surfaceVariant',
    animationScale: 'animation.scale',
    height: 4,
};

export const styles = StyleSheet.create({});
