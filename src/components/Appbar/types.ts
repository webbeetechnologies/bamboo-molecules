import type { ReactElement } from 'react';
import type { ViewStyle } from 'react-native';
import type { SurfaceProps } from '../Surface';

export type AppbarType = 'center-aligned' | 'small' | 'medium' | 'large';

export type AppbarBaseProps = Omit<SurfaceProps, 'children'> & {
    _type?: AppbarType;

    innerContainerStyle?: ViewStyle;
    children: ReactElement | ReactElement[];
};

export type AppbarProps = Omit<AppbarBaseProps, '_type'>;
