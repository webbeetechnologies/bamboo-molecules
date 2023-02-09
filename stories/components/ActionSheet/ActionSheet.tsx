import { useCallback, useState } from 'react';
import { ActionSheet, Button, ActionSheetProps } from '../../../src/components';

export type Props = ActionSheetProps & {};

export const Example = (props: ActionSheetProps) => {
    return <ActionSheet {...props} />;
};

export const ExampleWithTrigger = (props: ActionSheetProps) => {
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
