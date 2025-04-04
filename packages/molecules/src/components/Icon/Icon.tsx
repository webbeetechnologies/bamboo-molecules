import { forwardRef, memo, useMemo } from 'react';
import iconFactory from './iconFactory';
import type { IconProps } from './types';
// import { useComponentStyles } from '../../hooks';
import { StyleSheet } from 'react-native-unistyles';
import { getRegisteredMoleculesComponentStyles, registerComponentStyles } from '../../core';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material-community', style, color, ...rest }: IconProps, ref: any) => {
    const IconComponent = iconFactory(type);
    const componentStyles = useMemo(
        () => [style, styles.root, color ? { color } : {}],
        [style, color],
    );

    return <IconComponent ref={ref} style={componentStyles} {...rest} />;
};

export const iconStylesDefault = StyleSheet.create(theme => ({
    root: {
        animationScale: theme.animation.scale,
        color: theme.colors.onSurface,
    },
}));

registerComponentStyles('Icon', iconStylesDefault);

const styles = getRegisteredMoleculesComponentStyles('Icon');

export default memo(forwardRef(Icon));
