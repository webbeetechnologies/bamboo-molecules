import { useContext } from 'react';
import { NavigationStackContext } from './NavigationStack';

export const useNavigation = () => {
    return useContext(NavigationStackContext);
};

export const useRoute = () => {
    return useContext(NavigationStackContext).currentRoute;
};
