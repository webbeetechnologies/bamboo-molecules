import { memo } from 'react';
import { View, type ViewProps } from 'react-native';
import { drawerHeaderStyles } from './utils';
export type Props = ViewProps & {};

const DrawerHeader = memo(({ style, children, ...rest }: Props) => {
    return (
        <View style={[drawerHeaderStyles.root, style]} {...rest}>
            {children}
        </View>
    );
});

DrawerHeader.displayName = 'Drawer_Header';

export default DrawerHeader;
