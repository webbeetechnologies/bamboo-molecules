import {
    Children,
    isValidElement,
    cloneElement,
    ComponentPropsWithRef,
    ComponentType,
    ReactNode,
    useMemo,
    memo,
    forwardRef,
} from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps &
    ComponentPropsWithRef<ComponentType<ViewProps>> & {
        /**
         * Content of the `DialogActions`.
         */
        children: ReactNode;

        containerStyle?: ViewStyle;

        style?: StyleProp<ViewStyle>;
    };

/**
 * A component to show a list of actions in a Dialog.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/dialog-actions.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button, Dialog, Portal } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Actions>
 *           <Button onPress={() => console.log('Cancel')}>Cancel</Button>
 *           <Button onPress={() => console.log('Ok')}>Ok</Button>
 *         </Dialog.Actions>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogActions = (
    { children, style, containerStyle: containerStyleProp = {}, ...rest }: Props,
    ref: any,
) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Dialog_Actions', [
        { container: containerStyleProp },
        style,
    ]);

    const { spacing, containerStyle, childrenProps } = useMemo(() => {
        const { spacing: _spacing, container } = componentStyles;

        return {
            spacing: _spacing,
            containerStyle: container,
            childrenProps: (i: number) => ({
                style: {
                    marginLeft: i === 0 ? 0 : spacing,
                },
            }),
        };
    }, [componentStyles]);

    return (
        <View {...rest} style={containerStyle} ref={ref}>
            {Children.map(children, (child, i) =>
                isValidElement(child) ? cloneElement(child, childrenProps(i)) : child,
            )}
        </View>
    );
};

DialogActions.displayName = 'Dialog_Actions';

export default memo(forwardRef(DialogActions));
