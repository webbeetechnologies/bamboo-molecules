import type { TextStyle, ViewStyle } from 'react-native';
import {
    ProvideMolecules,
    useMolecules,
    extendTheme,
    useComponentStyles,
    ComponentStylePropWithVariants,
    TouchableRippleProps,
} from 'bamboo-molecules';

export type Props = TouchableRippleProps & {
    variant?: 'outlined' | 'text' | 'contained';
};

export const buttonDefaultStyles: ComponentStylePropWithVariants<TextStyle, 'disabled'> = {
    minWidth: 64,
    borderStyle: 'solid',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,

    states: {
        disabled: {
            color: 'colors.onSurfaceDisabled',
        },
    },
    variants: {
        outlined: {
            backgroundColor: 'transparent',
            color: 'colors.primary',
            borderColor: 'colors.outline',
            borderWidth: 1,

            states: {
                disabled: {
                    borderColor: 'colors.surfaceDisabled',
                },
            },
        },
        text: {
            backgroundColor: 'transparent',
            color: 'colors.primary',

            states: {
                disabled: {},
            },
        },
        contained: {
            backgroundColor: 'colors.primary',
            color: 'colors.onPrimary',

            states: {
                disabled: {
                    backgroundColor: 'transparent',
                },
            },
        },
    },
};

const theme = extendTheme({
    colorMode: 'light',
    CustomButton: buttonDefaultStyles,
});

const darkTheme = extendTheme({
    colorMode: 'dark',
    CustomButton: buttonDefaultStyles,

    CustomButtonTwo: {
        ...buttonDefaultStyles,
        variants: {
            ...buttonDefaultStyles.variants,
            contained: {
                ...((buttonDefaultStyles?.variants?.contained as ViewStyle) ?? {}),
                backgroundColor: 'colors.error',
                color: 'colors.scrim',
                borderColor: 'colors.outline',
            },
        },
    },
});

export const Button = ({
    style,
    variant = 'text',
    disabled: disabledProp,
    onPress,
    componentName,
    ...rest
}: Props & { componentName: string }) => {
    const disabled = disabledProp || !onPress;
    const { TouchableRipple, Text } = useMolecules();
    const { color, ...buttonStyles } = useComponentStyles(componentName, style, {
        variant: variant,
        states: { disabled },
    });

    return (
        <TouchableRipple
            style={buttonStyles}
            disabled={disabledProp}
            onPress={onPress}
            accessibilityRole="button"
            {...rest}>
            <Text selectable={false} style={{ color }}>
                {rest.children}
            </Text>
        </TouchableRipple>
    );
};

const CustomButtonExampleTwo = Button.bind({});

export const Example = (props: Props) => {
    return (
        <ProvideMolecules theme={theme}>
            <Button {...props} componentName="CustomButton" children="Custom Button" />
        </ProvideMolecules>
    );
};

export const NestedThemeExample = (props: Props) => {
    const { Card } = useMolecules();
    return (
        <ProvideMolecules theme={theme}>
            <Card>
                <Card.Header>
                    <Card.Headline>Light Mode</Card.Headline>
                </Card.Header>
                <Card.Content>
                    <Button {...props} componentName="CustomButton" children="I am primary" />
                    <ProvideMolecules theme={darkTheme}>
                        <Card style={{ marginTop: 10 }}>
                            <Card.Header>
                                <Card.Headline>Dark Mode</Card.Headline>
                            </Card.Header>
                            <Card.Content>
                                <CustomButtonExampleTwo
                                    {...props}
                                    componentName="CustomButtonTwo"
                                    children="I am red"
                                />
                                <Button
                                    {...props}
                                    componentName="CustomButton"
                                    children="I am primary"
                                />
                            </Card.Content>
                        </Card>
                    </ProvideMolecules>
                </Card.Content>
            </Card>
        </ProvideMolecules>
    );
};
