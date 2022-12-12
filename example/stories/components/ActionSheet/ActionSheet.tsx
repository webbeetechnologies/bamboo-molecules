import { useCallback, useState } from 'react';
import { useMolecules, ActionSheetProps } from 'bamboo-molecules';

export type Props = ActionSheetProps & {};

export const Example = (props: ActionSheetProps) => {
    const { ActionSheet } = useMolecules();

    return <ActionSheet {...props} />;
};

export const ExampleWithTrigger = (props: ActionSheetProps) => {
    const { ActionSheet, Button } = useMolecules();
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <Button onPress={onOpen}>Show Action Sheet</Button>
            <ActionSheet {...props} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    );
};
