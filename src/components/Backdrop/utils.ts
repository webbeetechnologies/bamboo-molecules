import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet, ViewStyle } from 'react-native';

type States = ''; // 'disabled' | 'hovered' | 'pressed';
type CustomProps = {
    // labelColor: string
    // checkedColor: string;
};

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {};

export const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgb(0, 0, 0)',
        opacity: 0.3,
    },
});
