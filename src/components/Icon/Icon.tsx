import { memo, forwardRef } from 'react';
import { withNormalizedStyleProp } from '../../hocs';
import iconFactory from './iconFactory';
import type { IconProps } from './types';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material', ...rest }: IconProps, ref: any) => {
    const IconComponent = iconFactory(type);

    return <IconComponent ref={ref} {...rest} />;
};

export default memo(forwardRef(withNormalizedStyleProp(Icon)));
