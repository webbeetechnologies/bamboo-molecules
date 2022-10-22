import { useWindowDimensions } from 'react-native';
import { useMolecules, ButtonProps, useComponentStyles } from 'bamboo-molecules';
import { useMemo } from 'react';

export type RoundButtonProps = ButtonProps & {
    variant?: 'outlined' | 'text' | 'contained';
};

const RoundButton = ({
    disabled,
    onPress,
    children,
    variant,
    style,
    ...props
}: RoundButtonProps) => {
    const { Button, Text } = useMolecules();
    const { color, fontSize, ...roundBtnStyles } = useComponentStyles('RoundButton', style, {
        variant,
    });
    const screen = useWindowDimensions();
    const buttonWidth = screen.width / 6;

    const calcScreenStyle = useMemo(
        () => ({ height: Math.floor(buttonWidth - 10), borderRadius: Math.floor(buttonWidth) }),
        [buttonWidth],
    );

    return (
        <Button
            style={[calcScreenStyle, roundBtnStyles]}
            variant={variant}
            disabled={disabled}
            {...props}>
            <Text style={{ color, fontSize }}>{children}</Text>
        </Button>
    );
};

export default RoundButton;
