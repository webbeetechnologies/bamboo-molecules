import { useEffect, useRef } from 'react';
import { useMolecules } from 'bamboo-molecules';
import type { ActionSheetProps, ActionSheetRef } from 'react-native-actions-sheet';

export type Props = ActionSheetProps & {};

export const Example = (props: ActionSheetProps) => {
    const { ActionSheet } = useMolecules();
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        // to display on render
        actionSheetRef.current?.show();
    }, []);

    return <ActionSheet {...props} ref={actionSheetRef} />;
};

export const ExampleWithTrigger = (props: ActionSheetProps) => {
    const { ActionSheet, Button } = useMolecules();
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const onOpen = () => {
        actionSheetRef.current?.show();
    };

    return (
        <>
            <Button onPress={onOpen}>Show Action Sheet</Button>
            <ActionSheet {...props} ref={actionSheetRef} />
        </>
    );
};
