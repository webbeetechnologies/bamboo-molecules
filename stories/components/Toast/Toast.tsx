import { useCallback } from 'react';

import { useMolecules, Toast, MaterialToastProps } from '../../../src';

export type Props = MaterialToastProps & {};

export const Example = (props: Props) => {
    const { Button } = useMolecules();

    const onPressAction = useCallback(() => {}, []);

    const showToast = useCallback(() => {
        Toast.show({
            text1: "Hi, I'm a Toast with action button",
            position: 'bottom',
            visibilityTime: 2000,
            ...props,
            props: {
                actionButtonLabel: 'Action',
                displayActionButton: true,
                displayCloseButton: true,
                onPressAction,
                ...props.props,
            },
        });
    }, [onPressAction, props]);

    return <Button onPress={showToast}>Show Toast</Button>;
};
