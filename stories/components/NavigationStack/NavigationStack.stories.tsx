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
    const { NavigationStack, View, Button, Text } = useMolecules();
    const ref = useRef<NavigationStackHandle>(null);

    const onPressProfile = () => {
        ref.current?.navigate('profile');
    };

    const onGoBack = () => {
        ref.current?.goBack();
    };

    return (
        <NavigationStack ref={ref} initialRouteName="home" {...props}>
            <NavigationStack.Item name="home">
                <View
                    style={StyleSheet.flatten([
                        styles.container,
                        { backgroundColor: 'colors.surfaceVariant' },
                    ])}>
                    <Text style={styles.text}>Home</Text>
                    <Button variant="outlined" onPress={onPressProfile}>
                        Go To Profile
                    </Button>
                </View>
            </NavigationStack.Item>
            <NavigationStack.Item name="profile">
                <View
                    style={StyleSheet.flatten([
                        styles.container,
                        {
                            backgroundColor: 'colors.onNeutral1',
                        },
                    ])}>
                    <Text style={styles.text}>Profile</Text>
                    <Button variant="outlined" onPress={onGoBack}>
                        Go Back
                    </Button>
                </View>
            </NavigationStack.Item>
        </NavigationStack>
    );`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
