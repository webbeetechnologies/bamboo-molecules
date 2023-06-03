import { useContext } from 'react';
import { NavigationStackContext } from './NavigationStack';
import type { ComponentStylePropWithVariants } from '../../types';
import type { ViewStyle } from 'react-native';

export const useNavigation = () => {
    return useContext(NavigationStackContext);
};

export const useRoute = () => {
    return useContext(NavigationStackContext).currentRoute;
};

export const navigationStackItemStyles: ComponentStylePropWithVariants<ViewStyle> = {};
