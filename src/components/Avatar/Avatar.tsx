import type { TextProps, ViewProps } from '@bambooapp/bamboo-atoms';
import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { ImageErrorEventData, ImageProps, NativeSyntheticEvent } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { IconProps } from '../Icon';

export type Props = Omit<ViewProps, 'children'> & {
    source?: ImageProps['source'];
    /**
     * Will be used as fallback if source is nullish or image doesn't load
     * */
    iconName?: IconProps['name'];
    iconType?: IconProps['type'];
    iconProps?: Omit<IconProps, 'name' | 'type'>;
    /**
     * Will be used as fallback if link and iconName aren't passed
     * */
    label?: string;
    labelProps?: Omit<TextProps, 'children'>;
    imageProps?: Omit<ImageProps, 'source'>;
    /**
     * Color of the Avatar
     * Will not be visible if there's an image unless the image has transparency
     * Can be color string or token
     * */
    color?: string;
    /**
     * Size of the Avatar
     * Can be a number of a token
     * */
    size?: number | string;
};

const Avatar = (
    {
        source,
        label,
        iconName,
        iconType,
        color,
        style,
        size: sizeProp,
        iconProps,
        imageProps,
        labelProps,
        ...rest
    }: Props,
    ref: any,
) => {
    const { View } = useMolecules();

    const componentStyles = useComponentStyles('Avatar', [
        style,
        color ? { backgroundColor: color } : {},
        sizeProp ? { size: sizeProp } : {},
    ]);

    const { containerStyle, iconStyle, imageStyle, labelStyle, size } = useMemo(() => {
        const {
            image: _imageStyle,
            icon: _iconStyle,
            label: _labelStyle,
            size: _size,
            ...restStyles
        } = componentStyles;

        return {
            containerStyle: [restStyles, { width: _size, height: _size }],
            imageStyle: [_imageStyle, imageProps?.style],
            iconStyle: [_iconStyle, iconProps?.style],
            labelStyle: [_labelStyle, { fontSize: _size * 0.5 }, labelProps?.style],
            size: _size,
        };
    }, [componentStyles, iconProps?.style, imageProps?.style, labelProps?.style]);

    return (
        <View ref={ref} {...rest} style={containerStyle}>
            <AvatarInner
                source={source}
                imageProps={imageProps}
                iconProps={iconProps}
                iconStyle={iconStyle}
                size={size}
                iconName={iconName}
                label={label}
                labelProps={labelProps}
                labelStyle={labelStyle}
                iconType={iconType}
                imageStyle={imageStyle}
            />
        </View>
    );
};

type AvatarInnerProps = Pick<
    Props,
    'iconName' | 'iconType' | 'iconProps' | 'imageProps' | 'labelProps' | 'label' | 'source'
> & {
    imageStyle?: ImageProps['style'];
    iconStyle?: IconProps['style'];
    labelStyle?: TextProps['style'];
    // at this point size will always be a number
    size: number;
};

const emptyObj = {};

const AvatarInner = memo(
    ({
        imageStyle,
        source,
        iconStyle,
        labelStyle,
        imageProps = emptyObj,
        iconProps,
        labelProps,
        iconName,
        iconType,
        label: labelProp,
        size,
    }: AvatarInnerProps) => {
        const { Image, Icon, Text } = useMolecules();
        const [isImageFailed, setIsImageFailed] = useState(false);

        const { onError } = imageProps;

        const normalizeLabel = useMemo(() => {
            const { firstWord, lastWord } = extractFirstAndLastWord(labelProp || '');

            return `${firstWord[0] || ''}${lastWord[0] || firstWord[1] || ''}`;
        }, [labelProp]);

        const onImageLoadFailed = useCallback(
            (e: NativeSyntheticEvent<ImageErrorEventData>) => {
                onError?.(e);

                setIsImageFailed(true);
            },
            [onError],
        );

        useEffect(() => {
            if (!isImageFailed) return;

            setIsImageFailed(false);
        }, [source, isImageFailed]);

        if (source && !isImageFailed) {
            return (
                <Image
                    {...imageProps}
                    onError={onImageLoadFailed}
                    style={imageStyle}
                    source={source}
                />
            );
        }

        if (iconName) {
            return (
                <Icon
                    name={iconName}
                    type={iconType}
                    size={size * 0.66}
                    {...iconProps}
                    style={iconStyle}
                />
            );
        }

        return (
            <Text {...labelProps} style={labelStyle}>
                {normalizeLabel}
            </Text>
        );
    },
);

const extractFirstAndLastWord = (text: string) => {
    const words = text.split(' ');

    return {
        firstWord: words[0] || '',
        lastWord: words.length <= 1 ? '' : words[words.length - 1],
    };
};

export default memo(forwardRef(Avatar));
