import type {ComponentStylePropWithVariants} from '../../types';
import {StyleSheet, ViewStyle} from 'react-native';

type States = ''; // 'disabled' | 'hovered' | 'pressed';
type CustomProps = {
    // labelColor: string
    // checkedColor: string;
};

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {};

export const styles = StyleSheet.create({});
