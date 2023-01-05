import { memo } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ScrollViewProps & {};

const DrawerContent = memo(({ style, children, ...rest }: Props) => {
    const componentStyles = useComponentStyles('Drawer_Content', style);

    return (
        <ScrollView style={componentStyles} {...rest}>
            {children}
        </ScrollView>
    );
});

DrawerContent.displayName = 'Drawer.Content';

export default DrawerContent;
