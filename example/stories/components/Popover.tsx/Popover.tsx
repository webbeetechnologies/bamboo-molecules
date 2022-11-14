import { useMolecules, PopoverProps, ButtonProps } from 'bamboo-molecules';
import { FC, forwardRef } from 'react';

export const Example: FC<PopoverProps> = props => {
    const { Popover, View } = useMolecules();

    return (
        <View style={{ padding: 100 }}>
            <Popover {...props} />
        </View>
    );
};

export const Button = forwardRef<any, ButtonProps>((props: ButtonProps, ref) => {
    const { Button: ButtonComponent } = useMolecules();

    return <ButtonComponent {...props} ref={ref} />;
});

export const PopoverContent = () => {
    const { View, Text } = useMolecules();

    return (
        <View testID="popover-body">
            <Text testID="popover-text">I'm a popover</Text>
        </View>
    );
};
