import { memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import type { IconProps } from '../Icon';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = IconProps & {
    containerStyle?: ViewStyle;
};

/**
 * A component to show an icon in a Dialog.
 *
 *  <div class="screenshots">
 *   <img class="small" src="screenshots/dialog-icon.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { StyleSheet } from 'react-native';
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
 *         <Dialog.Icon icon="alert" />
 *         <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
 *         <Dialog.Content>
 *           <Paragraph>This is simple dialog</Paragraph>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   title: {
 *     textAlign: 'center',
 *   },
 * })
 *
 * export default MyComponent;
 * ```
 */
const DialogIcon = ({ containerStyle, color: colorProp, style, size = 24, ...rest }: Props) => {
    const { Icon, View } = useMolecules();
    const componentStyles = useComponentStyles('Dialog_Icon');

    const { container, iconColor, iconStyle } = useMemo(() => {
        const { color, container: _container, ...restStyle } = componentStyles;

        return {
            container: [_container, containerStyle],
            iconColor: colorProp || color,
            iconStyle: [restStyle, style],
        };
    }, [colorProp, componentStyles, containerStyle, style]);

    return (
        <View style={container}>
            <Icon {...rest} color={iconColor} style={iconStyle} size={size} />
        </View>
    );
};

DialogIcon.displayName = 'Dialog.Icon';

export default memo(DialogIcon);
