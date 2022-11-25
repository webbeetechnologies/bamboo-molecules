import { useCallback, useState } from 'react';
import { useMolecules, DialogProps } from 'bamboo-molecules';

export type Props = DialogProps & {};

export const Example = (props: Props) => {
    const { Dialog } = useMolecules();

    return <Dialog {...props} />;
};

export const ExampleWithContent = (props: Props) => {
    const { Dialog, Text, Button } = useMolecules();

    return (
        <Dialog {...props}>
            <Dialog.Icon name="cellphone-check" />
            <Dialog.Title>Dialog with Hero Icon</Dialog.Title>
            <Dialog.Content>
                <Text>
                    Dialog is a type of modal window that appears in front of app content to provide
                    critical information, or ask for a decision
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.onClose}>Cancel</Button>
                <Button onPress={props.onClose}>Enabled</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export const ExampleWithTrigger = (props: Props) => {
    const { Button } = useMolecules();
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <Button onPress={onOpen}>Show Dialog</Button>
            <ExampleWithContent {...props} isOpen={isOpen} onClose={onClose} />
        </>
    );
};
