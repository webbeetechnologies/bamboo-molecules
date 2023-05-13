import { ComponentPropsWithRef, ReactNode, ComponentType, memo, forwardRef } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps &
    ComponentPropsWithRef<ComponentType<ViewProps>> & {
        /**
         * ContainerComponent prop allows to replace the default container used in DrawerContent - ScrollView
         * */
        ContainerComponent?: ComponentType<any>;
        /**
         * Content of the `DialogContent`.
         */
        children: ReactNode;
        style?: StyleProp<ViewStyle>;
    };

const DialogContent = ({ ContainerComponent, children, style, ...rest }: Props, ref: any) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Dialog_Content', style);

    const Container = ContainerComponent || View;

    return (
        <Container {...rest} style={componentStyles} ref={ref}>
            {children}
        </Container>
    );
};

DialogContent.displayName = 'Dialog_Content';

export default memo(forwardRef(DialogContent));
