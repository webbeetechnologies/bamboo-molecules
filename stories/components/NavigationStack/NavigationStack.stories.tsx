import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './NavigationStack';

export default {
    title: 'components/NavigationStack',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
 import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules, NavigationStackHandle,  } from '@bambooapp/bamboo-molecules';

export const Example = () => {
    const { View, Text, NavigationStack, Button } = useMolecules();
    const ref = useRef<NavigationStackHandle>(null);

    const onPressProfile = () => {
        ref.current?.navigate('profile');
    };

    const onPressSettings = () => {
        ref.current?.navigate('settings');
    };

    const onGoBack = () => {
        ref.current?.goBack();
    };

    return (
        <NavigationStack ref={ref} initialRouteName="home">
            <NavigationStack.Item name="home">
                <View style={styles.container}>
                    <Text style={styles.text}>Home</Text>
                    <Button style={styles.button} variant="outlined" onPress={onPressProfile}>
                        Go To Profile
                    </Button>
                </View>
            </NavigationStack.Item>
            <NavigationStack.Item name="profile">
                <View style={styles.container}>
                    <Text style={styles.text}>Profile</Text>
                    <Button style={styles.button} variant="outlined" onPress={onPressSettings}>
                        Go To Settings
                    </Button>
                    <Button style={styles.button} variant="outlined" onPress={onGoBack}>
                        Go Back
                    </Button>
                </View>
            </NavigationStack.Item>
            <NavigationStack.Item name="settings">
                <View style={styles.container}>
                    <Text style={styles.text}>Settings</Text>
                    <Button style={styles.button} variant="outlined" onPress={onGoBack}>
                        Go Back
                    </Button>
                </View>
            </NavigationStack.Item>
        </NavigationStack>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400,
        padding: 'spacings.4',
        borderRadius: 'shapes.corner.medium' as unknown as number,
        textAlign: 'center',
        backgroundColor: 'colors.surfaceVariant',
    },
    text: {
        marginBottom: 'spacings.8',
        fontSize: 'typescale.titleLarge.fontSize' as unknown as number,
    },
    button: {
        marginBottom: 'spacings.4',
    },
});`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
