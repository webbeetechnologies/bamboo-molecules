import { memo, forwardRef, ReactNode, useMemo } from 'react';
import { type StyleProp, type ViewStyle, type ViewProps, View } from 'react-native';
import { cardMediaStyles } from './utils';

export type Props = ViewProps & {
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
};

const CardMedia = memo(
    forwardRef(({ style, children, ...rest }: Props, ref: any) => {
        const componentStyles = useMemo(() => [cardMediaStyles.root, style], [style]);

        return (
            <View style={componentStyles} {...rest} ref={ref}>
                {children}
            </View>
        );
    }),
);

CardMedia.displayName = 'Card_Media';

export default CardMedia;
