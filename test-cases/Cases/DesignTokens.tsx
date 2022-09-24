import { ProvideMolecules, extendTheme, useComponentTheme, useMolecules } from 'bamboo-molecules';
import { StyleSheet } from 'react-native';

/**
 *
 * UseCase: As a user of Bamboo Molecules, I want to be able to use design tokens stored inside the theme context as the styles values
 * As a library developer, I want to be able normalize the design tokens I set in the theme provider into the actual values so that I can be applied to the components
 *
 * Description: Design Tokens are defined inside the Theme Context. Inside the theme, `light` property holds the design tokens of the light theme and `dark` property holds the tokens of the dark theme
 * A consumer should be able use those design tokens by defining its path as a string.
 * A consumer should be able to replace the design tokens or extend the design tokens
 * A consumer should be able to pass down the design tokens inside the styles props and it should be normalized (when button component is created, these two test cases will be tested)
 * Should be able to define the active, hover, focused states
 * Design tokens should also provide a way to define multiple roundness, and spacing properties
 *
 */

const theme = extendTheme({
    CustomButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 'roundness.1',

        primary: {
            backgroundColor: 'colors.primary',
        },
        secondary: {
            backgroundColor: 'colors.secondary',
        },
        third: {},
    },
    Text: {
        color: 'colors.onPrimary',
        fontSize: 18,
    },
    light: {
        colors: {
            primary: 'red',
        },
    },
});

const Example = () => {
    const { View, Button, Text } = useMolecules();
    const buttonStyles = useComponentTheme('CustomButton');
    const textStyles = useComponentTheme('Text');

    return (
        <View style={styles.buttonContainer}>
            <Button style={StyleSheet.flatten([buttonStyles, buttonStyles.primary])}>
                <Text style={StyleSheet.flatten([textStyles])}>Hello</Text>
            </Button>
        </View>
    );
};

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
});
