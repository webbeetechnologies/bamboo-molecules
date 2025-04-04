'use client';

import { StyleSheet } from 'react-native-unistyles';
// import { Button } from '@bambooapp/bamboo-molecules/src/components/Button';
import dynamic from 'next/dynamic';

const ButtonComponent = dynamic(
    () => import('@bambooapp/bamboo-molecules/src/components/Button/Button'),
    {
        ssr: false,
    },
);
// import { TextInput } from '@bambooapp/bamboo-molecules/src/components/TextInput';
// import { ActivityIndicator } from '@bambooapp/bamboo-molecules/src/components/ActivityIndicator';
// import Checkbox from '@bambooapp/bamboo-molecules/src/components/Checkbox/Checkbox';
import { View } from 'react-native';
// import { TestComponent } from './TestComponent';

const stylesC = StyleSheet.create(() => ({
    container: {
        // backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'flex-start',
    },
}));

export default function Home() {
    return (
        <div>
            <View style={stylesC.container}>
                {/* <ActivityIndicator /> */}
                {/* <Checkbox /> */}
                <ButtonComponent variant="contained" onPress={() => {}}>
                    Hello
                </ButtonComponent>
                {/* <TextInput label="Input" variant="outlined" /> */}
            </View>
            {/* <TestComponent /> */}
        </div>
    );
}
