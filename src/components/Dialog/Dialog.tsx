import { memo, ReactNode, Children, isValidElement, cloneElement, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { ModalProps } from '../Modal';
import type { IconProps } from '../Icon';
import DialogIcon from './DialogIcon';

export type Props = ModalProps & {
    /**
     * Callback that is called when the user dismisses the dialog.
     */
    onClose?: () => void;
    /**
     * Determines Whether the dialog is visible.
     */
    isOpen: boolean;
    /**
     * Content of the `Dialog`.
     */
    children: ReactNode;
    Icon?: IconProps;
    style?: StyleProp<ViewStyle>;
};

/**
 * Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.
 * To render the `Dialog` above other components, you'll need to wrap it with the [`Portal`](portal.html) component.
 *
 *  <div class="screenshots">
 *   <img class="small" src="screenshots/dialog-1.png" />
 *   <img class="small" src="screenshots/dialog-2.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const showDialog = () => setVisible(true);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Provider>
 *       <View>
 *         <Button onPress={showDialog}>Show Dialog</Button>
 *         <Portal>
 *           <Dialog visible={visible} onDismiss={hideDialog}>
 *             <Dialog.Title>Alert</Dialog.Title>
 *             <Dialog.Content>
 *               <Paragraph>This is simple dialog</Paragraph>
 *             </Dialog.Content>
 *             <Dialog.Actions>
 *               <Button onPress={hideDialog}>Done</Button>
 *             </Dialog.Actions>
 *           </Dialog>
 *         </Portal>
 *       </View>
 *     </Provider>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const Dialog = ({ children, onClose, Icon, contentStyle = {}, ...rest }: Props) => {
    const { Modal } = useMolecules();
    const componentStyles = useComponentStyles('Dialog', { container: contentStyle });

    const { containerStyle, childStyle } = useMemo(() => {
        const { spacing, container } = componentStyles;

        return {
            childStyle: {
                marginTop: spacing,
            },
            containerStyle: container,
        };
    }, [componentStyles]);

    return (
        <Modal elevation={2} {...rest} onClose={onClose} contentStyle={containerStyle}>
            <>
                {Icon ? <DialogIcon {...Icon} /> : null}
                {Children.toArray(children)
                    .filter(child => child != null && typeof child !== 'boolean')
                    .map((child, i) => {
                        if (i === 0 && isValidElement(child) && !Icon) {
                            return cloneElement(child, {
                                style: [childStyle, child.props.style],
                            });
                        }
                        return child;
                    })}
            </>
        </Modal>
    );
};

export default memo(Dialog);
