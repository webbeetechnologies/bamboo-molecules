import { Dimensions } from 'react-native';
import { useMolecules, ButtonProps, useComponentStyles } from 'bamboo-molecules';

export type RoundButtonProps = ButtonProps & {
    variant?: 'outlined' | 'text' | 'contained';
};

const RoundButton = ({ disabled, onPress, children, variant, ...props }: RoundButtonProps) => {
    const { Button, Text } = useMolecules();
    const { color, fontSize, ...roundBtnStyles } = useComponentStyles(
        'RoundButton',
        {},
        { variant },
    );
    const screen = Dimensions.get('window');
    const buttonWidth = screen.width / 6;

    return (
        <Button
            style={[
                { height: Math.floor(buttonWidth - 10), borderRadius: Math.floor(buttonWidth) },
                roundBtnStyles,
            ]}
            variant={variant}
            disabled={disabled}
            {...props}>
            <Text style={{ color, fontSize }}>{children}</Text>
        </Button>
    );
};

export default RoundButton;
