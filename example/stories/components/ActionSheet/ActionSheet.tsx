import { useCallback } from 'react';
import { useMolecules, ActionSheetProps, useToggle } from 'bamboo-molecules';

export type Props = ActionSheetProps & {};

export const Example = (props: ActionSheetProps) => {
    const { ActionSheet } = useMolecules();

    return <ActionSheet {...props} />;
};

export const ExampleWithTrigger = (props: ActionSheetProps) => {
    const { ActionSheet, Button } = useMolecules();
    const { state: isOpen, setState: setIsOpen, onToggle } = useToggle(false);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <>
            <Button onPress={onToggle} testID={`${props.testID || ''}-trigger`}>
                Show Action Sheet
            </Button>
            <ActionSheet {...props} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    );
};
