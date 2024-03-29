import { FC, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules, useToggle } from '../../../src';
import { Button, Popover, PopoverProps } from '../../../src/components';

export const Example: FC<Partial<PopoverProps>> = props => {
    const { View } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle } = useToggle(false);

    return (
        <>
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        padding: 'spacings.24',
    },
});
