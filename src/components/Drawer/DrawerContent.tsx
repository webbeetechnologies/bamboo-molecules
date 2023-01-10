import { ComponentType, memo } from 'react';
import { ScrollViewProps, ScrollView } from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ScrollViewProps & {
    /**
     * ContainerComponent prop allows to replace the default container used in DrawerContent - ScrollView
     * */
    ContainerComponent?: ComponentType<any>;
};

const DrawerContent = memo(
    ({ style, children, ContainerComponent = ScrollView, ...rest }: Props) => {
        const componentStyles = useComponentStyles('Drawer_Content', style);

        return (
            <ContainerComponent style={componentStyles} {...rest}>
                {children}
            </ContainerComponent>
        );
    },
);

DrawerContent.displayName = 'Drawer.Content';

export default DrawerContent;
