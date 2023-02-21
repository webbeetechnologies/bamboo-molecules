import { useCallback, useState } from 'react';
import { Dialog, Button, Portal, DialogProps } from '../../../src/components';
import { useMolecules } from '../../../src';

export type Props = DialogProps & {};

export const Example = (props: Props) => {
    return (
        <Portal>
            <Dialog {...props} />
        </Portal>
    );
};

export const ExampleWithContent = (props: Props) => {
    const { Text } = useMolecules();

    return (
        <Portal>
            <Dialog iconProps={{ name: 'cellphone-check' }} {...props}>
                <Dialog.Title>Dialog with Hero Icon</Dialog.Title>
                <Dialog.Content>
                    <Text>
                        Dialog is a type of modal window that appears in front of app content to
                        provide critical information, or ask for a decision
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={props.onClose}>Cancel</Button>
                    <Button onPress={props.onClose}>Enabled</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export const ExampleWithTrigger = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <Button onPress={onOpen} testID="dialog-trigger">
                Show Dialog
            </Button>
            <ExampleWithContent {...props} isOpen={isOpen} onClose={onClose} />
        </>
    );
};
