import { StyleSheet } from 'react-native-unistyles';

export type States =
    | 'disabled'
    | 'focused'
    | 'hovered'
    | 'hoveredAndFocused'
    | 'errorFocusedAndHovered'
    | 'error'
    | 'errorFocused'
    | 'errorHovered'
    | 'errorDisabled';

export const getInputMinHeight = (variant: string, size: string) => {
    switch (true) {
        case variant === 'outlined' && size === 'lg':
            return 64;
        case variant === 'outlined' && size === 'md':
            return 56;
        case variant === 'outlined' && size === 'sm':
            return 48;
        case variant === 'flat' && size === 'lg':
            return 64;
        case variant === 'flat' && size === 'md':
            return 56;
        case variant === 'flat' && size === 'sm':
            return 52;
        default:
            return 0;
    }
};

export const inputLabelStyles = StyleSheet.create({
    labelContainer: {
        zIndex: 3,
        justifyContent: 'center',
    },
});
