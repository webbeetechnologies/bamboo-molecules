import { ProvideMolecules, useMolecules, useComponentTheme, extendTheme } from 'bamboo-molecules';
import type { ButtonProps } from '@webbee/bamboo-atoms';
import { StyleSheet } from 'react-native';

export type Props = ButtonProps & {
    variants: 'primary' | 'secondary' | 'tertiary';
};

const theme = extendTheme({
    CustomButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 'roundness.1',

        primary: {
            backgroundColor: 'colors.primary',
        },
        secondary: {
            backgroundColor: 'colors.secondary',
        },
        tertiary: {
            backgroundColor: 'colors.tertiary',
        },
    },
    Text: {
        color: 'colors.onSecondary',
    },
});

export const Components = ({ style, variants, ...rest }: Props) => {
    const { Button, Text } = useMolecules();
    const buttonStyles = useComponentTheme('CustomButton');

    return (
        <Button style={StyleSheet.flatten([buttonStyles, buttonStyles[variants], style])} {...rest}>
            <Text>Custom Button</Text>
        </Button>
    );
};

export const Example = (props: Props) => {
    return (
        <ProvideMolecules theme={theme}>
            <Components {...props} />
        </ProvideMolecules>
    );
};
