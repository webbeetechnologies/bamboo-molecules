import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules, NavigationStackProps, NavigationStackHandle } from 'bamboo-molecules';

export type Props = NavigationStackProps & {};

export const Example = (props: Props) => {
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
    );
};

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400,
        padding: 'spacings.4',
        borderRadius: 'shapes.corner.medium' as unknown as number,
        textAlign: 'center',
    },
    text: {
        marginBottom: 'spacings.4',
        fontSize: 'typescale.titleLarge.fontSize' as unknown as number,
    },
});
