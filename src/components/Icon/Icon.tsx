import { memo } from 'react';
import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import iconFactory from './iconFactory';
import type { IconProps } from './types';
import { useComponentStyles } from '../../hooks';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material', style, ...rest }: IconProps) => {
    const IconComponent = iconFactory(type);
    const componentStyles = useComponentStyles('Icon', style);

    return <IconComponent style={componentStyles} {...rest} />;
};

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export default memo(Icon);
