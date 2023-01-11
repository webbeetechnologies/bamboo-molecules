import { forwardRef, memo, ReactNode, useMemo } from 'react';
import type { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import type { MD3Elevation } from '../../core/theme/types';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import { CallbackActionState, withActionState } from '../../hocs';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { IconButtonProps } from '../IconButton';
import type { ActivityIndicatorProps } from '../ActivityIndicator';

export type Props = Omit<TouchableRippleProps, 'children'> &
    CallbackActionState &
    WithElements<ReactNode> & {
        /**
         * label of the chip
         * Will be truncated if it's longer than 20 characters
         */
        label: string;
        /**
         * character limit of the label
         */
        labelCharacterLimit?: number;
        /**
         * Variant of the chip.
         * - `elevated` - elevated chip with shadow and without outline.
         * - `outlined` - chip with an outline. (outline will always have elevation 0 even if it's specified)
         */
        variant?: 'elevated' | 'outlined';
        /**
         *
         * */
        size?: 'sm' | 'md';
        /**
         * callback event when the closeIcon is pressed
         */
        onClose?: () => void;
        /**
         * elevation level of the elevated chip
         */
        elevation?: MD3Elevation;
        /**
         * selected state
         */
        selected?: boolean;
        /**
         * props for the close icon
         * default is { name: 'close', onPress: onClose, disabled, accessibilityLabel: 'Close' }
         */
        closeIconProps?: IconButtonProps;
        /**
         * props for the ActivityIndicator
         * default is { size: 18 }
         */
        activityIndicatorProps?: ActivityIndicatorProps;
        /**
         * Whether to style the chip color as selected.
         */
        selectedColor?: string;
        /**
         * Whether to display overlay on selected chip
         */
        selectionBackgroundColor?: string;
        /**
         * Accessibility label for the chip. This is read by the screen reader when the user taps the chip.
         */
        accessibilityLabel?: string;
        /**
         * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
         */
        disabled?: boolean;
        /**
         * Function to execute on press.
         */
        onPress?: (e: GestureResponderEvent) => void;
        /**
         * Whether to show the ActivityIndicator or not
         */
        loading?: boolean;
        /**
         * container style
         */
        containerStyle?: ViewStyle;
        /**
         * left element container style
         */
        leftElementContainerStyle?: ViewStyle;
        /**
         * right element container style
         */
        rightElementContainerStyle?: ViewStyle;
        /**
         * label style
         */
        labelStyle?: TextStyle;
        /**
         * Pass down testID from chip props to touchable for Detox tests.
         */
        testID?: string;
    };

const Chip = (
    {
        style,
        containerStyle: containerStyleProp,
        label,
        labelCharacterLimit = 20,
        variant = 'outlined',
        size = 'md',
        disabled,
        hovered = false,
        elevation: elevationProp = 1,
        left,
        right,
        loading = false,
        onClose,
        closeIconProps,
        activityIndicatorProps,
        selected = false,
        leftElementContainerStyle: leftElementContainerStyleProp,
        rightElementContainerStyle: rightElementContainerStyleProp,
        labelStyle: labelStyleProp,
        accessibilityLabel,
        selectedColor: selectedColorProp,
        selectionBackgroundColor: selectionBackgroundColorProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Surface, TouchableRipple, Text } = useMolecules();
    const componentStyles = useComponentStyles(
        'Chip',
        [
            style,
            {
                container: containerStyleProp || {},
                leftElement: leftElementContainerStyleProp || {},
                rightElement: rightElementContainerStyleProp || {},
                label: labelStyleProp || {},
            },
            selectionBackgroundColorProp
                ? { selectionBackgroundColor: selectionBackgroundColorProp }
                : {},
            selectedColorProp ? { selectedColor: selectedColorProp } : {},
        ],
        {
            variant,
            size,
            states: {
                disabled: !!disabled,
                selected,
                selectedAndHovered: selected && hovered,
                hovered,
            },
        },
    );

    const {
        iconSize,
        containerStyle,
        touchableRippleStyle,
        leftElementStyle,
        rightElementStyle,
        labelStyle,
    } = useMemo(() => {
        const {
            iconSize: _iconSize,
            container,
            touchableRippleContainer,
            leftElement,
            rightElement,
            label: _labelStyle,
            selectionBackgroundColor,
            selectedColor,
            ...restStyle
        } = componentStyles;

        return {
            iconSize: _iconSize,
            containerStyle: [
                container,
                selected && selectionBackgroundColor
                    ? { backgroundColor: selectionBackgroundColor }
                    : {},
            ],
            touchableRippleStyle: [touchableRippleContainer, restStyle],
            leftElementStyle: leftElement,
            rightElementStyle: rightElement,
            labelStyle: [_labelStyle, selected && selectedColor ? { color: selectedColor } : {}],
        };
    }, [componentStyles, selected]);

    const { accessibilityState, elevation } = useMemo(
        () => ({
            accessibilityState: {
                selected,
                disabled,
            },
            elevation: variant === 'outlined' || disabled ? 0 : elevationProp,
        }),
        [disabled, elevationProp, selected, variant],
    );

    return (
        <Surface elevation={elevation} style={containerStyle}>
            <TouchableRipple
                borderless
                {...rest}
                disabled={disabled}
                style={touchableRippleStyle}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                accessibilityState={accessibilityState}
                ref={ref}>
                <>
                    <LeftElement
                        iconSize={iconSize}
                        leftElementStyle={leftElementStyle}
                        left={left}
                        activityIndicatorProps={activityIndicatorProps}
                        loading={loading}
                        selected={selected}
                    />
                    <Text selectable={false} style={labelStyle}>
                        {label.length < labelCharacterLimit
                            ? `${label}`
                            : `${label.substring(0, labelCharacterLimit - 3)}...`}
                    </Text>
                    <RightElement
                        rightElementStyle={rightElementStyle}
                        accessibilityState={accessibilityState}
                        right={right}
                        disabled={disabled}
                        onClose={onClose}
                        closeIconProps={closeIconProps}
                    />
                </>
            </TouchableRipple>
        </Surface>
    );
};

type LeftElementProps = Pick<Props, 'activityIndicatorProps' | 'left' | 'loading' | 'selected'> & {
    leftElementStyle: ViewStyle;
    iconSize: number;
};
const LeftElement = memo(
    ({
        iconSize,
        loading,
        left,
        selected,
        activityIndicatorProps,
        leftElementStyle,
    }: LeftElementProps) => {
        const { View, ActivityIndicator, Icon } = useMolecules();

        return loading || left || selected ? (
            <View style={leftElementStyle}>
                {loading ? (
                    <ActivityIndicator size={iconSize} {...(activityIndicatorProps || {})} />
                ) : (
                    left || <Icon name="check" size={iconSize} />
                )}
            </View>
        ) : (
            <></>
        );
    },
);

type RightElementProps = Pick<
    Props,
    'onClose' | 'right' | 'closeIconProps' | 'disabled' | 'accessibilityState'
> & {
    rightElementStyle: ViewStyle;
};
const RightElement = memo(
    ({
        onClose,
        right,
        disabled,
        closeIconProps,
        rightElementStyle,
        accessibilityState,
    }: RightElementProps) => {
        const { View, IconButton } = useMolecules();

        return onClose || right ? (
            <View style={rightElementStyle}>
                {onClose ? (
                    <IconButton
                        name="close"
                        size={18}
                        accessibilityLabel="Close"
                        disabled={disabled}
                        onPress={onClose}
                        accessibilityState={accessibilityState}
                        {...(closeIconProps || {})}
                    />
                ) : (
                    right
                )}
            </View>
        ) : (
            <></>
        );
    },
);

export default memo(withActionState(forwardRef(Chip)));
