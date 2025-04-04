import { ComponentPropsWithRef, ReactNode, ComponentType, memo, forwardRef } from 'react';
import { type ViewStyle, type StyleProp, type ViewProps, View } from 'react-native';
import { dialogContentStyles } from './utils';

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
    const Container = ContainerComponent || View;

    return (
        <Container {...rest} style={[dialogContentStyles.root, style]} {...{ ref }}>
            {children}
        </Container>
    );
};

DialogContent.displayName = 'Dialog_Content';

export default memo(forwardRef(DialogContent));
