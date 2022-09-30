import { StyleSheet } from 'react-native';
import type { TextProps } from '@webbee/bamboo-atoms';
import { extendTheme, ProvideMolecules, useMolecules, withRipple } from 'bamboo-molecules';

const theme = extendTheme({});

const Example = () => {
    const { View, Text, TouchableRipple, ActivityIndicator, Divider } = useMolecules();

    return (
        <>
            <TouchableRipple rippleColor="#333" onPress={() => {}}>
                <View style={[styles.cardContainer, { backgroundColor: 'rgba(255, 255, 255, 1)' }]}>
                    <Text>Test text</Text>
                    <ActivityIndicator animating={true} />
                </View>
            </TouchableRipple>
            <Text>Text</Text>
            <Divider
                bold
                style={StyleSheet.flatten([
                    { background: 'colors.primary' },
                    { marginVertical: 10 },
                ])}
            />
            <Text>Divided</Text>

            <CustomButton onPress={() => {}} rippleContainerStyles={{ width: 200, padding: 20 }}>
                Custom Button
            </CustomButton>
        </>
    );
};

// by inserting the component props with generics, withRipple will return the correctly typed component // TextProps will override/extend it's default type TouchableRippleProps
const CustomButton = withRipple<TextProps>(({ children }) => {
    const { View, Text } = useMolecules();
    return (
        <View>
            <Text>{children}</Text>
        </View>
    );
});

export default () => {
    return (
        <ProvideMolecules theme={theme}>
            <Example />
        </ProvideMolecules>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    cardContainer: {
        flexDirection: 'row',
        padding: 50,
    },
});
