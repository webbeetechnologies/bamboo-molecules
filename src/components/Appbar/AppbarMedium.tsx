import { memo } from 'react';
import { useComponentStyles } from '../../hooks';
import { default as AppbarBase } from './AppbarBase';
import type { AppbarProps } from './types';

const AppbarMedium = ({ style, ...rest }: AppbarProps) => {
    const componentStyles = useComponentStyles('Appbar_Medium', style);

    return <AppbarBase _type="medium" style={componentStyles} {...rest} />;
};

export default memo(AppbarMedium);
