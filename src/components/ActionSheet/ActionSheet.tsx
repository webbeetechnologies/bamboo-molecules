import React, { forwardRef, memo } from 'react';
import DefaultActionSheet, {
    ActionSheetProps as DefaultActionSheetProps,
    ActionSheetRef,
} from 'react-native-actions-sheet';
import { useComponentStyles } from '../../hooks';

export type Props = DefaultActionSheetProps & {
    // our custom props
};

export type IActionSheet = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ActionSheetRef>
>;

const ActionSheet = (
    { containerStyle, indicatorStyle, overlayColor, ...rest }: Props,
    ref: any,
) => {
    const componentStyles = useComponentStyles('ActionSheet', {
        containerStyle: containerStyle || {}, // to prevent from override with undefined values
        indicatorStyle: indicatorStyle || {},
        ...(overlayColor ? { overlayColor } : {}),
    });

    return (
        <DefaultActionSheet
            {...rest}
            containerStyle={componentStyles.containerStyle}
            indicatorStyle={componentStyles.indicatorStyle}
            overlayColor={componentStyles.overlayColor}
            ref={ref}
        />
    );
};

export default memo(forwardRef(ActionSheet));
