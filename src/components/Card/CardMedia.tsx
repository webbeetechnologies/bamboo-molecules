import { memo, ComponentPropsWithRef, forwardRef, useMemo } from 'react';
import { Image, ImageProps, StyleProp, View, ViewStyle } from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ImageProps &
    ComponentPropsWithRef<typeof Image> & {
        style?: StyleProp<ViewStyle>;
    };

const CardMedia = ({ style, ...rest }: Props, ref: any) => {
    const componentStyles = useComponentStyles('Card_Media', style);

    const { containerStyle, imageStyle } = useMemo(() => {
        const { container, image, ...restStyle } = componentStyles;

        return {
            containerStyle: [container, restStyle],
            imageStyle: image,
        };
    }, [componentStyles]);

    return (
        <View style={containerStyle}>
            <Image {...rest} style={imageStyle} accessibilityIgnoresInvertColors ref={ref} />
        </View>
    );
};

CardMedia.displayName = 'Card.Media';

export default memo(forwardRef(CardMedia));
