import { textFactory } from '@bambooapp/bamboo-atoms';
import { memoize } from '../../utils';
import { IconPacks, IconType } from './types';

const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
    customIcons[id] = customIcon;
};

export default memoize((type: IconType): any =>
    textFactory(
        'Icon',
        {},
        false,
        (() => {
            switch (type) {
                case IconPacks.Zocial:
                    return require('react-native-vector-icons/Zocial').default;
                case IconPacks.Octicon:
                    return require('react-native-vector-icons/Octicons').default;
                case IconPacks.Material:
                    return require('react-native-vector-icons/MaterialIcons').default;
                case IconPacks.MaterialCommunity:
                    return require('react-native-vector-icons/MaterialCommunityIcons').default;
                case IconPacks.Ionicon:
                    return require('react-native-vector-icons/Ionicons').default;
                case IconPacks.Foundation:
                    return require('react-native-vector-icons/Foundation').default;
                case IconPacks.EvilIcons:
                    return require('react-native-vector-icons/EvilIcons').default;
                case IconPacks.Entypo:
                    return require('react-native-vector-icons/Entypo').default;
                case IconPacks.FontAwesome:
                    return require('react-native-vector-icons/FontAwesome').default;
                case IconPacks.FontAwesome5:
                    return require('react-native-vector-icons/FontAwesome5').default;
                case IconPacks.SimpleLineIcon:
                    return require('react-native-vector-icons/SimpleLineIcons').default;
                case IconPacks.Feather:
                    return require('react-native-vector-icons/Feather').default;
                case IconPacks.AntDesign:
                case 'antdesign':
                    return require('react-native-vector-icons/AntDesign').default;
                case IconPacks.Fontisto:
                    return require('react-native-vector-icons/Fontisto').default;
                default:
                    if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
                        return customIcons[type];
                    }
                    return require('react-native-vector-icons/MaterialIcons').default;
            }
        })(),
    ),
);
