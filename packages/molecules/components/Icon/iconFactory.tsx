// import { textFactory } from '../Text/textFactory';
import { withUnistyles } from 'react-native-unistyles';

import { memoize } from '../../utils';
import { IconPacks, IconType } from './types';

const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
    customIcons[id] = customIcon;
};

export default memoize((type: IconType) => {
    switch (type) {
        case IconPacks.Zocial:
            return withUnistyles(require('react-native-vector-icons/Zocial').default);
        case IconPacks.Octicon:
            return withUnistyles(require('react-native-vector-icons/Octicons').default);
        case IconPacks.Material:
            return withUnistyles(require('react-native-vector-icons/MaterialIcons').default);
        case IconPacks.MaterialCommunity:
            return withUnistyles(
                require('react-native-vector-icons/MaterialCommunityIcons').default,
            );
        case IconPacks.Ionicon:
            return withUnistyles(require('react-native-vector-icons/Ionicons').default);
        case IconPacks.Foundation:
            return withUnistyles(require('react-native-vector-icons/Foundation').default);
        case IconPacks.EvilIcons:
            return withUnistyles(require('react-native-vector-icons/EvilIcons').default);
        case IconPacks.Entypo:
            return withUnistyles(require('react-native-vector-icons/Entypo').default);
        case IconPacks.FontAwesome:
            return withUnistyles(require('react-native-vector-icons/FontAwesome').default);
        case IconPacks.FontAwesome5:
            return withUnistyles(require('react-native-vector-icons/FontAwesome5').default);
        case IconPacks.SimpleLineIcon:
            return withUnistyles(require('react-native-vector-icons/SimpleLineIcons').default);
        case IconPacks.Feather:
            return withUnistyles(require('react-native-vector-icons/Feather').default);
        case IconPacks.AntDesign:
        case 'antdesign':
            return withUnistyles(require('react-native-vector-icons/AntDesign').default);
        case IconPacks.Fontisto:
            return withUnistyles(require('react-native-vector-icons/Fontisto').default);
        default:
            if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
                return customIcons[type];
            }
            return withUnistyles(require('react-native-vector-icons/MaterialIcons').default);
    }
});
