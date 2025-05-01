import { forwardRef, memo, useMemo } from 'react';
import iconFactory from './iconFactory';
import type { IconProps } from './types';
// import { useComponentStyles } from '../../hooks';
import { StyleSheet } from 'react-native-unistyles';
import { getRegisteredMoleculesComponentStyles, registerComponentStyles } from '../../core';
import { Mappings } from 'react-native-unistyles/lib/typescript/src/core/withUnistyles/types';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = (
    {
        type = 'material-community',
        style,
        color,
        ...rest
    }: IconProps & { uniProps?: Mappings<any> },
    ref: any,
) => {
    const IconComponent = iconFactory(type);
    const componentStyles = useMemo(
        () => [styles.root, style, color ? { color } : {}],
        [style, color],
    );

    return <IconComponent ref={ref} style={componentStyles} {...rest} />;
};

export const iconStylesDefault = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.onSurface,
    },
}));

registerComponentStyles('Icon', iconStylesDefault);

export const styles = getRegisteredMoleculesComponentStyles('Icon');

export default memo(forwardRef(Icon));
