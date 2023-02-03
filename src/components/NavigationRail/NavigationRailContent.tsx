import { ComponentType, memo } from 'react';
import { ScrollViewProps, View } from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ScrollViewProps & {
    /**
     * ContainerComponent prop allows to replace the default container used in DrawerContent - ScrollView
     * */
    ContainerComponent?: ComponentType<any>;
};

const NavigationRailContent = memo(
    ({ style, children, ContainerComponent = View, ...rest }: Props) => {
        const componentStyles = useComponentStyles('NavigationRail_Content', style);

        return (
            <ContainerComponent style={componentStyles} {...rest}>
                {children}
            </ContainerComponent>
        );
    },
);

NavigationRailContent.displayName = 'NavigationRail_Content';

export default NavigationRailContent;
