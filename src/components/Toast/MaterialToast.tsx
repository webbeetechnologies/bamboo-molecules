import { ComponentType, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { TextProps, useColorMode, ViewProps } from '@bambooapp/bamboo-atoms';

import { useComponentStyles, useMolecules } from '../../hooks';
import { ProvideTheme } from '../../core/theme/ProvideTheme';
import { extendTheme } from '../../core/theme/extendTheme';
import type { SurfaceProps } from '../Surface';
import type { ButtonProps } from '../Button';
import type { IconButtonProps } from '../IconButton';
import type {
    ToastHideParams,
    ToastPosition,
    ToastShowParams,
    ToastType,
} from 'react-native-toast-message/lib/src/types';

type CustomProps = Omit<SurfaceProps, 'children'> & {
    onPressAction?: () => void;
    actionButtonLabel?: string;
    displayActionButton?: boolean;
    displayCloseButton?: boolean;

    textsContainerProps?: ViewProps;
    titleProps?: TextProps;
    descriptionProps?: TextProps;
    actionButtonProps?: Omit<ButtonProps, 'onPress' | 'children'>;
    iconButtonProps?: Partial<Omit<IconButtonProps, 'onPress'>>;
};

export type Props = {
    position?: ToastPosition;
    type?: ToastType;
    isVisible?: boolean;
    text1?: string;
    text2?: string;
    show?: (params: ToastShowParams) => void;
    hide?: (params: ToastHideParams) => void;
    props: CustomProps;
};

const MaterialToast = ({ text1, text2, hide, props = {} }: Props) => {
    const {
        displayActionButton = false,
        onPressAction,
        actionButtonLabel = 'Action',
        displayCloseButton = false,
        style,

        textsContainerProps = {},
        titleProps = {},
        descriptionProps = {},
        actionButtonProps = {},
        iconButtonProps = {},
        ...rest
    } = props;

    const { Button, Surface, View, Text, IconButton } = useMolecules();
    const styles = useComponentStyles('MaterialToast', style);
    const onHide = useCallback(() => hide?.(), [hide]);

    const {
        containerStyle,
        textContainerStyle,
        titleStyle,
        descriptionStyle,
        actionButtonStyle,
        iconButtonStyle,
    } = useMemo(() => {
        const {
            container,
            textContainer,
            title,
            description,
            actionButton,
            iconButton,
            ...restStyle
        } = styles;

        return {
            containerStyle: [
                container,
                text1 && text2 ? { minHeight: 68 } : {},
                restStyle,
            ] as ViewStyle,
            textContainerStyle: [textContainer, textsContainerProps.style],
            titleStyle: [title, titleProps.style],
            descriptionStyle: [description, descriptionProps.style],
            actionButtonStyle: [actionButton, actionButtonProps.style],
            iconButtonStyle: [iconButton, iconButtonProps.style],
        };
    }, [
        actionButtonProps.style,
        descriptionProps.style,
        iconButtonProps.style,
        styles,
        text1,
        text2,
        textsContainerProps.style,
        titleProps.style,
    ]);

    return (
        <Surface style={containerStyle} elevation={3} {...rest}>
            <>
                <View {...textsContainerProps} style={textContainerStyle}>
                    <Text numberOfLines={1} ellipsizeMode="tail" {...titleProps} style={titleStyle}>
                        {text1}
                    </Text>

                    {text2 && (
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            {...descriptionProps}
                            style={descriptionStyle}>
                            {text2}
                        </Text>
                    )}
                </View>

                {displayActionButton && (
                    <Button
                        variant="text"
                        {...actionButtonProps}
                        onPress={onPressAction}
                        style={actionButtonStyle}>
                        {actionButtonLabel}
                    </Button>
                )}

                {displayCloseButton && (
                    <IconButton
                        name="close"
                        size={24}
                        onPress={onHide}
                        {...iconButtonProps}
                        style={iconButtonStyle}
                    />
                )}
            </>
        </Surface>
    );
};

const withInverseTheme =
    <P,>(Component: ComponentType<P>) =>
    (props: P) => {
        const { colorMode } = useColorMode();

        const inverseTheme = useMemo(
            () =>
                extendTheme({
                    colorMode: colorMode === 'dark' ? 'light' : 'dark',
                }),
            [colorMode],
        );

        return (
            <ProvideTheme theme={inverseTheme}>
                <Component {...props} />
            </ProvideTheme>
        );
    };

export default withInverseTheme(MaterialToast);
