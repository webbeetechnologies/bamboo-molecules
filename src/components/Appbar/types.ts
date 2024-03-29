import type { ReactElement } from 'react';
import type { ViewStyle } from 'react-native';
import type { SurfaceProps } from '../Surface';
import type { MD3Elevation } from '../../core/theme/types';

export type AppbarType = 'center-aligned' | 'small' | 'medium' | 'large';

export type AppbarBaseProps = Omit<SurfaceProps, 'children' | 'elevation'> & {
    _type?: AppbarType;

    innerContainerStyle?: ViewStyle;
    children: ReactElement | ReactElement[];

    scrolling?: boolean;
    elevation?: MD3Elevation;
};

export type AppbarProps = Omit<AppbarBaseProps, '_type'>;
