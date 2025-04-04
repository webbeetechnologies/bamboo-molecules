import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const touchableRippleStylesDefault = StyleSheet.create(theme => ({
    root: {
        rippleColor: theme.colors.onSurfaceRipple,
    } as any,
}));

registerComponentsStyles({
    TouchableRipple: touchableRippleStylesDefault,
});

export const touchableRippleStyles = getRegisteredMoleculesComponentStyles('TouchableRipple');
