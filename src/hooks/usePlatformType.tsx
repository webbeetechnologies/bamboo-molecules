import { useContext } from 'react';
import { Platform } from 'react-native';
import { PlatformTypeContext } from '../core/platform/ProvidePlatformType';

const usePlatformType = () => {
    const platformType = useContext(PlatformTypeContext);

    switch (Platform.OS) {
        case 'android':
        case 'ios':
            return Platform.OS;
        default:
            return platformType;
    }
};

export default usePlatformType;
