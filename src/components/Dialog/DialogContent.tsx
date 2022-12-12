import { ComponentPropsWithRef, ReactNode, ComponentType, memo, forwardRef } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps &
    ComponentPropsWithRef<ComponentType<ViewProps>> & {
        /**
         * Content of the `DialogContent`.
         */
        children: ReactNode;
        style?: StyleProp<ViewStyle>;
    };

/**
 * A component to show content in a Dialog.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/dialog-content.png" />
 *   </figure>
 * </div>
 *
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Paragraph, Dialog, Portal } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Content>
 *           <Paragraph>This is simple dialog</Paragraph>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogContent = ({ children, style, ...rest }: Props, ref: any) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Dialog_Content', style);

    return (
        <View {...rest} style={componentStyles} ref={ref}>
            {children}
        </View>
    );
};

DialogContent.displayName = 'Dialog.Content';

export default memo(forwardRef(DialogContent));
