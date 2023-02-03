import { memo, forwardRef, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
};

const CardMedia = memo(
    forwardRef(({ style, children, ...rest }: Props, ref: any) => {
        const { View } = useMolecules();
        const componentStyles = useComponentStyles('Card_Media', style);

        return (
            <View style={componentStyles} {...rest} ref={ref}>
                {children}
            </View>
        );
    }),
);

CardMedia.displayName = 'Card_Media';

export default CardMedia;
