import { memo, ReactElement } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules, useSubcomponents } from '../../hooks';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement | ReactElement[];
};

const allowedChildren = ['Drawer.Footer', 'Drawer.Header', 'Drawer.Content'];

const Drawer = ({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Drawer', style);

    const { header, footer, content } = useSubcomponents({ children, allowedChildren });

    return (
        <View style={componentStyles} {...rest}>
            {header}
            {content}
            {footer}
        </View>
    );
};

export default memo(Drawer);
