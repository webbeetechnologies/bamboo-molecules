import { ComponentType, memo } from 'react';
import { ScrollViewProps, ScrollView } from 'react-native';
import { drawerContentStyles } from './utils';

export type Props = ScrollViewProps & {
    /**
     * ContainerComponent prop allows to replace the default container used in DrawerContent - ScrollView
     * */
    ContainerComponent?: ComponentType<any>;
};

const DrawerContent = memo(
    ({ style, children, ContainerComponent = ScrollView, ...rest }: Props) => {
        return (
            <ContainerComponent style={[drawerContentStyles.root, style]} {...rest}>
                {children}
            </ContainerComponent>
        );
    },
);

DrawerContent.displayName = 'Drawer_Content';

export default DrawerContent;
