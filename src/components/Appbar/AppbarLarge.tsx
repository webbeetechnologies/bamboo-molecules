import { memo } from 'react';
import { useComponentStyles } from '../../hooks';
import { default as AppbarBase } from './AppbarBase';
import type { AppbarProps } from './types';

const AppbarLarge = ({ ...rest }: AppbarProps) => {
    const componentStyles = useComponentStyles('Appbar_Large');

    return <AppbarBase _type="large" style={componentStyles} {...rest} />;
};

export default memo(AppbarLarge);
