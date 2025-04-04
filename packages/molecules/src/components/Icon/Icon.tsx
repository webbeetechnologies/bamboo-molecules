import { forwardRef, memo, useMemo } from 'react';
import iconFactory from './iconFactory';
import type { IconProps } from './types';
// import { useComponentStyles } from '../../hooks';
import { StyleSheet } from 'react-native-unistyles';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material-community', style, color, ...rest }: IconProps, ref: any) => {
    const IconComponent = iconFactory(type);
    const componentStyles = useMemo(
        () => [style, defaultStyles.root, color ? { color } : {}],
        [style, color],
    );

    return <IconComponent ref={ref} style={componentStyles} {...rest} />;
};

export const defaultStyles = StyleSheet.create(theme => ({
    root: {
        animationScale: theme.animation.scale,
        color: theme.colors.onSurface,
    },
}));

export default memo(forwardRef(Icon));
