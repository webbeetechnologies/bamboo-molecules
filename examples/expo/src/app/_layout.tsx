import '../../unistyles';

import { PortalProvider } from '@bambooapp/bamboo-molecules/core';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
    return (
        <PortalProvider>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Slot />
            </View>
        </PortalProvider>
    );
}
