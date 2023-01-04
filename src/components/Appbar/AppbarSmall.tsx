import { memo } from 'react';
import { useComponentStyles } from '../../hooks';
import { default as AppbarBase } from './AppbarBase';
import type { AppbarProps } from './types';

const AppbarSmall = ({ style, ...rest }: AppbarProps) => {
    const componentStyles = useComponentStyles('Appbar_Small', style);

    return <AppbarBase _type="small" style={componentStyles} {...rest} />;
};

export default memo(AppbarSmall);
