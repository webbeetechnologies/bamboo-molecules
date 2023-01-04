import { memo } from 'react';
import { useComponentStyles } from '../../hooks';
import { default as AppbarBase } from './AppbarBase';
import type { AppbarProps } from './types';

const AppbarCenterAligned = ({ ...rest }: AppbarProps) => {
    const componentStyles = useComponentStyles('Appbar_CenterAligned');

    return <AppbarBase _type="center-aligned" style={componentStyles} {...rest} />;
};

export default memo(AppbarCenterAligned);
