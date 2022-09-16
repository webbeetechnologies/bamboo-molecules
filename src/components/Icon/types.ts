import type { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon';
import type { RefAttributes } from 'react';

export type IconType =
    | 'material'
    | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'antdesign'
    | 'font-awesome-5'
    | string;

export type IconProps = VectorIconProps &
    RefAttributes<VectorIconProps> & {
        type?: IconType;
    };
