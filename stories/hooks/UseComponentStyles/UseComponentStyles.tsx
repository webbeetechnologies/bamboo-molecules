import type { TextStyle } from 'react-native';
import {
    ProvideMolecules,
    useMolecules,
    extendTheme,
    useComponentStyles,
    ComponentStylePropWithVariants,
    TouchableRippleProps,
} from '../../../src';
import { TouchableRipple } from '../../../src/components';

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
    CustomButton: buttonDefaultStyles,
    Button: {
        color: 'colors.primary',
        borderColor: 'colors.outline',
        borderRadius: 'shapes.corner.extraSmall',
    },
});

export const Button = ({
    style,
    variant = 'text',
    disabled: disabledProp,
    onPress,
    children,
    ...rest
}: Props) => {
    const disabled = disabledProp || !onPress;
    const { Text } = useMolecules();
    const { color, ...buttonStyles } = useComponentStyles('CustomButton', style, {
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
                {children}
            </Text>
        </TouchableRipple>
    );
};

export const Example = () => {
    return (
        <ProvideMolecules theme={theme}>
            <Button variant="outlined" onPress={() => {}}>
                Custom Button
            </Button>
        </ProvideMolecules>
    );
};
