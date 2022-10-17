import { StyleSheet } from 'react-native';
import {
    ProvideMolecules,
    useMolecules,
    extendTheme,
    useComponentStyles,
    ButtonProps,
} from 'bamboo-molecules';

export type Props = ButtonProps & {
    color: 'primary' | 'secondary' | 'tertiary';
};

const theme = extendTheme({
    CustomButton: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 'roundness.1',
        color: '#fff',

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
});

export const Components = ({ style, color, ...rest }: Props) => {
    const { Button, Text } = useMolecules();
    const buttonStyles = useComponentStyles('CustomButton');

    return (
        <Button style={StyleSheet.flatten([buttonStyles, buttonStyles[color], style])} {...rest}>
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
