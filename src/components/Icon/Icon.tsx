import React, { memo, forwardRef } from 'react';
import { textFactory } from '@webbee/bamboo-atoms';
import iconFactory from './iconFactory';
import type { IconProps } from './types';

/**
 * Neutral component. Doesn't have platform specific styles
 */
const Icon = ({ type = 'material', ...rest }: IconProps, ref: any) => {
    const IconComponent = iconFactory(type);

    const Component = textFactory('Text', {}, false, IconComponent); // textFactory won't apply the theme styles if the Default Component is replaced

    return <Component ref={ref} {...rest} />;
};

export default memo(forwardRef(Icon));
