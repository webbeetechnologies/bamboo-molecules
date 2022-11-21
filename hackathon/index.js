import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';

import App from './App';

// workaround for cypto no defined on mobile
if (__DEV__ && typeof global.crypto !== 'object') {
    global.crypto = {
        getRandomValues: array => array.map(() => Math.floor(Math.random() * 256)),
    };
}

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
registerRootComponent(App);
