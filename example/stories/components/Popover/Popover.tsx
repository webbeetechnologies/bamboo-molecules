import { FC, useRef } from 'react';
import { useMolecules, PopoverProps, useToggle } from 'bamboo-molecules';

export const Example: FC<PopoverProps> = props => {
    const { Popover, View, Button } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle } = useToggle(false);

    return (
        <>
            <View style={{ padding: 100 }}>
                <Button ref={triggerRef} onPress={onToggle} testID={'trigger'}>
                    Show Popover
                </Button>
                <Popover {...props} triggerRef={triggerRef} isOpen={isOpen} onClose={onToggle} />
            </View>
        </>
    );
};

export const PopoverContent = () => {
    const { View, Text } = useMolecules();

    return (
        <View testID="popover-body">
            <Text testID="popover-text">I'm a popover</Text>
        </View>
    );
};
