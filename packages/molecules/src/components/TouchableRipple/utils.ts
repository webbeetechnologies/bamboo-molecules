import { StyleSheet } from 'react-native-unistyles';

export const touchableRippleStyles = StyleSheet.create(theme => ({
    root: {
        rippleColor: theme.colors.onSurfaceRipple,
    } as any,
}));
