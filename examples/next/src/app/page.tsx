'use client';

import { StyleSheet } from 'react-native-unistyles';

import { View } from 'react-native';

import dynamic from 'next/dynamic';
import { PortalProvider } from '@bambooapp/bamboo-molecules/core';

const TestComponent = dynamic(() => import('./TestComponent'), {
    ssr: false,
});

const stylesC = StyleSheet.create(() => ({
    container: {
        // backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'flex-start',
        paddingTop: 20,
    },
}));

export default function Home() {
    return (
        <div>
            <PortalProvider>
                <View style={stylesC.container}>
                    <TestComponent />
                </View>
            </PortalProvider>
        </div>
    );
}
