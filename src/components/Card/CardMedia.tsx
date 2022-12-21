import { memo, forwardRef, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
};

const CardMedia = ({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Card_Media', style);

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
};

CardMedia.displayName = 'Card.Media';

export default memo(forwardRef(CardMedia));
