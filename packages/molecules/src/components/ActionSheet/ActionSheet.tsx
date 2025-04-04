import React, { memo, useCallback, useEffect, useRef } from 'react';
import DefaultActionSheet, {
    ActionSheetProps as DefaultActionSheetProps,
    ActionSheetRef,
} from 'react-native-actions-sheet';

export type Props = DefaultActionSheetProps & {
    isOpen: boolean;
};

export type IActionSheet = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ActionSheetRef>
>;

const ActionSheet = ({
    isOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    containerStyle,
    indicatorStyle,
    overlayColor,
    ...rest
}: Props) => {
    const ref = useRef<ActionSheetRef>(null);

    const onOpen = useCallback(() => {
        onOpenProp?.();
    }, [onOpenProp]);

    const onClose = useCallback(() => {
        onCloseProp?.();
    }, [onCloseProp]);

    useEffect(() => {
        // to avoid re-renders
        if (isOpen && !ref?.current?.isOpen()) {
            ref?.current?.show();
            return;
        }

        if (!isOpen && ref?.current?.isOpen()) {
            ref?.current?.hide();
        }
    }, [isOpen]);

    return (
        <DefaultActionSheet
            {...rest}
            onOpen={onOpen}
            onClose={onClose}
            containerStyle={containerStyle}
            indicatorStyle={indicatorStyle}
            overlayColor={overlayColor}
            ref={ref}
        />
    );
};

export default memo(ActionSheet);
