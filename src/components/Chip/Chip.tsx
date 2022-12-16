import { forwardRef, memo, ReactNode, useMemo } from 'react';
import type { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import type { MD3Elevation } from '../../core/theme/types';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import { CallbackActionState, withActionState } from '../../hocs';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { IconType } from '../Icon';

export type Props = Omit<TouchableRippleProps, 'children'> &
    CallbackActionState &
    WithElements<ReactNode> & {
        /**
         * label of the chip
         * Will be truncated if it's longer than 20 characters
         */
        label: string;
        /**
         * Variant of the chip.
         * - `elevated` - elevated chip with shadow and without outline.
         * - `outlined` - chip with an outline. (outline will always have elevation 0 even if it's specified)
         */
        variant?: 'elevated' | 'outlined';
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
         * name of the closeIcon
         * default is `close`
         */
        closeIconName?: string;
        /**
         * type of the closeIcon
         * default is `material-community`
         */
        closeIconType?: IconType;
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
         * Accessibility label for the close icon. This is read by the screen reader when the user taps the close icon.
         */
        closeIconAccessibilityLabel?: string;
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
        variant = 'outlined',
        disabled,
        hovered = false,
        elevation: elevationProp = 1,
        left,
        right,
        loading = false,
        onClose,
        closeIconName = 'close',
        closeIconType = 'material-community',
        selected = false,
        leftElementContainerStyle: leftElementContainerStyleProp,
        rightElementContainerStyle: rightElementContainerStyleProp,
        labelStyle: labelStyleProp,
        accessibilityLabel,
        closeIconAccessibilityLabel = 'Close',
        selectedColor: selectedColorProp,
        selectionBackgroundColor: selectionBackgroundColorProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Surface, TouchableRipple, ActivityIndicator, IconButton, Icon, Text, View } =
        useMolecules();
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
            states: {
                disabled: !!disabled,
                selected,
                selectedAndHovered: selected && hovered,
                hovered,
            },
        },
    );

    const {
        containerStyle,
        touchableRippleStyle,
        leftElementStyle,
        rightElementStyle,
        labelStyle,
    } = useMemo(() => {
        const {
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
                    {(loading || left || selected) && (
                        <View style={leftElementStyle}>
                            {loading ? (
                                <ActivityIndicator size={18} />
                            ) : left ? (
                                left
                            ) : (
                                <Icon name="check" size={18} />
                            )}
                        </View>
                    )}
                    <Text selectable={false} style={labelStyle}>
                        {label.length < 20 ? `${label}` : `${label.substring(0, 17)}...`}
                    </Text>
                    {(onClose || right) && (
                        <View style={rightElementStyle}>
                            {onClose ? (
                                <IconButton
                                    name={closeIconName}
                                    type={closeIconType}
                                    onPress={onClose}
                                    size="xs"
                                    disabled={disabled}
                                    accessibilityLabel={closeIconAccessibilityLabel}
                                    accessibilityState={accessibilityState}
                                />
                            ) : (
                                right
                            )}
                        </View>
                    )}
                </>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(withActionState(forwardRef(Chip)));
