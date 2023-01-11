import { memo } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {};

const DrawerFooter = memo(({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Drawer_Footer', style);

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
});

DrawerFooter.displayName = 'Drawer_Footer';

export default DrawerFooter;
