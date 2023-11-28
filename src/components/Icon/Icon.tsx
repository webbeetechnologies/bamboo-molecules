import { forwardRef, memo } from 'react';
import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import { iconFactory } from './iconFactory';
import type { IconProps } from './types';
import { useComponentStyles } from '../../hooks';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material-community', style, color, ...rest }: IconProps, ref: any) => {
    const IconComponent = iconFactory(type);
    const componentStyles = useComponentStyles('Icon', [style, color ? { color } : {}]);

    return <IconComponent ref={ref} style={componentStyles} {...rest} />;
};

type CustomProps = {
    animationScale: string;
};

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, '', CustomProps> = {
    animationScale: 'animation.scale',
    color: 'colors.onSurface',
};

export default memo(forwardRef(Icon));
