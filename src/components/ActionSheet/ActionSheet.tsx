import React, { memo, useCallback, useEffect, useRef } from 'react';
import DefaultActionSheet, {
    ActionSheetProps as DefaultActionSheetProps,
    ActionSheetRef,
} from 'react-native-actions-sheet';
import { useComponentStyles } from '../../hooks';

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

    const componentStyles = useComponentStyles('ActionSheet', {
        containerStyle: containerStyle || {}, // to prevent from override with undefined values
        indicatorStyle: indicatorStyle || {},
        ...(overlayColor ? { overlayColor } : {}),
    });

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
            containerStyle={componentStyles.containerStyle}
            indicatorStyle={componentStyles.indicatorStyle}
            overlayColor={componentStyles.overlayColor}
            ref={ref}
        />
    );
};

export default memo(ActionSheet);
