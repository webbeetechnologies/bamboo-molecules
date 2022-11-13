import { memo } from 'react';
import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import iconFactory from './iconFactory';
import type { IconProps } from './types';
import { useComponentStyles } from '../../hooks';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material-community', style, ...rest }: IconProps) => {
    const IconComponent = iconFactory(type);
    const componentStyles = useComponentStyles('Icon', style);

    return <IconComponent style={componentStyles} {...rest} />;
};

type CustomProps = {
    animationScale: string;
};

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    animationScale: 'animation.scale',
};

export default memo(Icon);
