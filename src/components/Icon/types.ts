import type { TextProps } from '@bambooapp/bamboo-atoms';
import type { RefAttributes } from 'react';
import type { ColorValue } from 'react-native';

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

interface VectorIconProps extends TextProps {
    /**
     * Size of the icon, can also be passed as fontSize in the style object.
     *
     * @default 12
     */
    size?: number | undefined;

    /**
     * Name of the icon to show
     *
     * See Icon Explorer app
     * {@link https://github.com/oblador/react-native-vector-icons/tree/master/Examples/IconExplorer}
     */
    name: string;

    /**
     * Color of the icon
     *
     */
    color?: ColorValue | number | undefined;
}

export type IconType = `${IconPacks}`; // in TS 4.1+, we can do this to make enum values as a union type

export type IconProps = VectorIconProps &
    RefAttributes<VectorIconProps> & {
        type?: IconType;
    };
