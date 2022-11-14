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
