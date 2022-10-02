import { memo } from 'react';
import { withNormalizedStyleProp } from '../../hocs';
import iconFactory from './iconFactory';
import type { IconProps } from './types';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material', ...rest }: IconProps) => {
    const IconComponent = iconFactory(type);

    return <IconComponent {...rest} />;
};

export default memo(withNormalizedStyleProp(Icon));
