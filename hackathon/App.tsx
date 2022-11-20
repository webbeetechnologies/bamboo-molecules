import { useRef } from 'react';
import { Provider } from 'react-redux';
import { extendTheme, ProvideMolecules } from 'bamboo-molecules';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigator';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const theme = extendTheme({
    colorMode: 'light',
});

export default () => {
    const navigationRef = useRef(null);

    return (
        <SafeAreaProvider>
            <ProvideMolecules theme={theme}>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <NavigationContainer ref={navigationRef}>
                            <Navigator />
                        </NavigationContainer>
                    </PersistGate>
                </Provider>
            </ProvideMolecules>
        </SafeAreaProvider>
    );
};
