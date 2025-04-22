import { memo } from 'react';
import { View, type ViewProps } from 'react-native';
import { drawerFooterStyles } from './utils';

export type Props = ViewProps & {};

const DrawerFooter = memo(({ style, children, ...rest }: Props) => {
    return (
        <View style={[drawerFooterStyles.root, style]} {...rest}>
            {children}
        </View>
    );
});

DrawerFooter.displayName = 'Drawer_Footer';

export default DrawerFooter;
