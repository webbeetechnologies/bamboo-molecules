import { useContext } from 'react';
import { NavigationStackContext } from './NavigationStack';
import { StyleSheet } from 'react-native-unistyles';

export const useNavigation = () => {
    return useContext(NavigationStackContext);
};

export const useRoute = () => {
    return useContext(NavigationStackContext).currentRoute;
};

export const navigationStackItemStyles = StyleSheet.create({
    root: {},
});
