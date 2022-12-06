import type { ReactNode, ComponentPropsWithRef, ComponentType } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps &
    ComponentPropsWithRef<ComponentType<ViewProps>> & {
        /**
         * Content of the `DialogScrollArea`.
         */
        children: ReactNode;
        style?: StyleProp<ViewStyle>;
    };

/**
 * A component to show a scrollable content in a Dialog. The component only provides appropriate styling.
 * For the scrollable content you can use `ScrollView`, `FlatList` etc. depending on your requirement.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/dialog-scroll-area.gif" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ScrollView } from 'react-native';
 * import { Dialog, Portal, Text } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.ScrollArea>
 *           <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
 *             <Text>This is a scrollable area</Text>
 *           </ScrollView>
 *         </Dialog.ScrollArea>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogScrollArea = ({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Dialog_ScrollArea', style);

    return (
        <View {...rest} style={componentStyles}>
            {children}
        </View>
    );
};

DialogScrollArea.displayName = 'Dialog.ScrollArea';

export default DialogScrollArea;
