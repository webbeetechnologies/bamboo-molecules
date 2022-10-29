import type { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon';
import type { RefAttributes } from 'react';

export enum IconPacks {
    Material = 'material',
    MaterialCommunity = 'material-community',
    SimpleLineIcon = 'simple-line-icon',
    Zocial = 'zocial',
    FontAwesome = 'font-awesome',
    Octicon = 'octicon',
    Ionicon = 'ionicon',
    Feather = 'feather',
    Fontisto = 'fontisto',
    Foundation = 'foundation',
    EvilIcons = 'evilicon',
    Entypo = 'entypo',
    AntDesign = 'antdesign',
    FontAwesome5 = 'font-awesome-5',
}

export type IconType = `${IconPacks}`; // in TS 4.1+, we can do this to make enum values as a union type

export type IconProps = VectorIconProps &
    RefAttributes<VectorIconProps> & {
        type?: IconType;
    };
