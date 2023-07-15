import {
    useRef,
    forwardRef,
    useState,
    useEffect,
    useImperativeHandle,
    ReactNode,
    useCallback,
    useMemo,
    memo,
    PropsWithoutRef,
} from 'react';
import {
    Animated,
    TextInput as NativeTextInput,
    LayoutChangeEvent,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import type { TextInputProps, ViewProps } from '@bambooapp/bamboo-atoms';

import { withActionState, CallbackActionState } from '../../hocs';
import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import TextInputBase from './TextInputBase';
import type { RenderProps, TextInputLabelProp, TextInputSize } from './types';

const BLUR_ANIMATION_DURATION = 180;
const FOCUS_ANIMATION_DURATION = 150;

export type ElementProps = {
    color: string;
    forceFocus: () => void;
    focused: boolean;
};

type Element = ReactNode | ((props: ElementProps) => ReactNode);

export type Props = TextInputProps &
    CallbackActionState &
    WithElements<Element> & {
        /**
         * Variant of the TextInput.
         * - `flat` - flat input with an underline.
         * - `outlined` - input with an outline.
         *
         * In `outlined` variant, the background color of the label is derived from `colors?.background` in theme or the `backgroundColor` style.
         * This component render TextInputOutlined or TextInputFlat based on that props
         */
        variant?: 'flat' | 'outlined' | 'plain';
        /**
         * If true, user won't be able to interact with the component.
         */
        disabled?: boolean;
        /**
         * The text or component to use for the floating label.
         */
        label?: TextInputLabelProp;
        /**
         * Placeholder for the input.
         */
        placeholder?: string;
        /**
         * Whether to style the TextInput with error style.
         */
        error?: boolean;
        /**
         * Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
         */
        onChangeText?: Function;
        /**
         * Selection color of the input
         */
        selectionColor?: string;
        /**
         * Inactive underline color of the input.
         */
        underlineColor?: string;
        /**
         * Active underline color of the input.
         */
        activeUnderlineColor?: string;
        /**
         * Inactive outline color of the input.
         */
        outlineColor?: string;
        /**
         * Active outline color of the input.
         */
        activeOutlineColor?: string;
        /**
         * Sets min height with densed layout. For `TextInput` in `flat` mode
         * height is `64dp` or in dense layout - `52dp` with label or `40dp` without label.
         * For `TextInput` in `outlined` mode
         * height is `56dp` or in dense layout - `40dp` regardless of label.
         * When you apply `height` prop in style the `dense` prop affects only `paddingVertical` inside `TextInput`
         */
        size?: TextInputSize;
        /**
         * Whether the input can have multiple lines.
         */
        multiline?: boolean;
        /**
         * The number of lines to show in the input (Android only).
         */
        numberOfLines?: number;
        /**
         * The Supporting Text below the TextInput
         */
        supportingText?: string;
        /**
         * To display the required indicator in Supporting Text and in the Label
         */
        required?: boolean;
        /**
         * Callback that is called when the text input is focused.
         */
        onFocus?: (args: any) => void;
        /**
         * Callback that is called when the text input is blurred.
         */
        onBlur?: (args: any) => void;
        /**
         *
         * Callback to render a custom input component such as `react-native-text-input-mask`
         * instead of the default `TextInput` component from `react-native`.
         *
         * Example:
         * ```js
         * <TextInput
         *   label="Phone number"
         *   render={props =>
         *     <TextInputMask
         *       {...props}
         *       mask="+[00] [000] [000] [000]"
         *     />
         *   }
         * />
         * ```
         */
        render?: (props: RenderProps) => ReactNode;
        /**
         * Value of the text input.
         */
        value?: string;
        /**
         * Pass `fontSize` prop to modify the font size inside `TextInput`.
         * Pass `height` prop to set `TextInput` height.
         * Pass `backgroundColor` prop to set `TextInput` backgroundColor.
         */
        style?: StyleProp<TextStyle>;
        /**
         * Style of the entire Container
         */
        containerStyle?: StyleProp<ViewStyle>;
        /**
         * Style of the Input Container
         */
        inputContainerStyle?: StyleProp<ViewStyle>;
        /**
         * Style of the Input
         */
        inputStyle?: StyleProp<TextStyle>;
        /**
         * props for the stateLayer
         */
        stateLayerProps?: PropsWithoutRef<ViewProps>;
        /**
         * testID to be used on tests.
         */
        testID?: string;
    };

type TextInputHandles = Pick<
    NativeTextInput,
    'focus' | 'clear' | 'blur' | 'isFocused' | 'setNativeProps'
>;

const TextInput = forwardRef<TextInputHandles, Props>(
    (
        {
            variant = 'flat',
            size = 'md',
            disabled = false,
            error: errorProp = false,
            multiline = false,
            editable = true,
            required = false,
            maxFontSizeMultiplier = 15,
            supportingText,
            selectionColor: selectionColorProp,
            underlineColor: underlineColorProp,
            activeUnderlineColor: activeUnderlineColorProp,
            outlineColor: outlineColorProp,
            activeOutlineColor: activeOutlineColorProp,
            placeholderTextColor: placeholderTextColorProp,
            style,
            containerStyle,
            hovered = false,
            ...rest
        }: Props,
        ref,
    ) => {
        const isControlled = rest.value !== undefined;
        const validInputValue = isControlled ? rest.value : rest.defaultValue;

        const { View, HelperText } = useMolecules();

        const { current: labelAnimation } = useRef<Animated.Value>(
            new Animated.Value(validInputValue ? 0 : 1),
        );
        const { current: errorAnimation } = useRef<Animated.Value>(
            new Animated.Value(errorProp ? 1 : 0),
        );
        const [focused, setFocused] = useState<boolean>(false);
        const [placeholder, setPlaceholder] = useState<string | undefined>('');
        // Use value from props instead of local state when input is controlled
        const [value, onChangeValue] = useControlledValue({
            value: rest.value,
            defaultValue: rest.defaultValue,
            onChange: rest.onChangeText,
            disabled: !editable || disabled,
        });

        const styles = useComponentStyles(
            'TextInput',
            [
                style,
                {
                    selectionColor: selectionColorProp,
                    underlineColor: underlineColorProp,
                    activeUnderlineColor: activeUnderlineColorProp,
                    outlineColor: outlineColorProp,
                    activeOutlineColor: activeOutlineColorProp,
                    placeholderTextColor: placeholderTextColorProp,
                },
            ],
            {
                variant,
                states: {
                    errorDisabled: errorProp && disabled,
                    disabled,
                    errorFocusedAndHovered: errorProp && hovered && focused,
                    errorFocused: errorProp && focused,
                    errorHovered: errorProp && hovered,
                    hoveredAndFocused: hovered && focused,
                    hovered,
                    focused: focused,
                    error: !!errorProp,
                },
                size,
            },
        );

        const [labelLayout, setLabelLayout] = useState<{
            measured: boolean;
            width: number;
            height: number;
        }>({
            measured: false,
            width: 0,
            height: 0,
        });

        const timer = useRef<NodeJS.Timeout | undefined>();

        const root = useRef<NativeTextInput | undefined | null>();

        useImperativeHandle(
            ref,
            () => ({
                focus: () => root.current?.focus(),
                clear: () => root.current?.clear(),
                setNativeProps: (args: Object) => root.current?.setNativeProps(args),
                isFocused: () => root.current?.isFocused() || false,
                blur: () => root.current?.blur(),
                forceFocus: () => root.current?.focus(),
            }),
            [],
        );

        useEffect(() => {
            // When the input has an error, we wiggle the label and apply error styles
            if (errorProp) {
                // show error
                Animated.timing(errorAnimation, {
                    toValue: 1,
                    duration: FOCUS_ANIMATION_DURATION * (styles.animationScale || 1),
                    // To prevent this - https://github.com/callstack/react-native-paper/issues/941
                    useNativeDriver: true,
                }).start();
            } else {
                // hide error
                {
                    Animated.timing(errorAnimation, {
                        toValue: 0,
                        duration: BLUR_ANIMATION_DURATION * (styles.animationScale || 1),
                        // To prevent this - https://github.com/callstack/react-native-paper/issues/941
                        useNativeDriver: true,
                    }).start();
                }
            }
        }, [errorProp, errorAnimation, styles]);

        useEffect(() => {
            // Show placeholder text only if the input is focused, or there's no label
            // We don't show placeholder if there's a label because the label acts as placeholder
            // When focused, the label moves up, so we can show a placeholder
            if (focused || !rest.label) {
                // Set the placeholder in a delay to offset the label animation
                // If we show it immediately, they'll overlap and look ugly
                timer.current = setTimeout(
                    () => setPlaceholder(rest.placeholder),
                    50,
                ) as unknown as NodeJS.Timeout;
            } else {
                // hidePlaceholder
                setPlaceholder('');
            }

            return () => {
                if (timer.current) {
                    clearTimeout(timer.current);
                }
            };
        }, [focused, rest.label, rest.placeholder]);

        useEffect(() => {
            // The label should be minimized if the text input is focused, or has text
            // In minimized mode, the label moves up and becomes small
            // workaround for animated regression for react native > 0.61
            // https://github.com/callstack/react-native-paper/pull/1440
            if (value || focused) {
                // minimize label
                Animated.timing(labelAnimation, {
                    toValue: 0,
                    duration: BLUR_ANIMATION_DURATION * (styles.animationScale || 1),
                    // To prevent this - https://github.com/callstack/react-native-paper/issues/941
                    useNativeDriver: true,
                }).start();
            } else {
                // restore label
                {
                    Animated.timing(labelAnimation, {
                        toValue: 1,
                        duration: FOCUS_ANIMATION_DURATION * (styles.animationScale || 1),
                        // To prevent this - https://github.com/callstack/react-native-paper/issues/941
                        useNativeDriver: true,
                    }).start();
                }
            }
        }, [focused, value, labelAnimation, styles]);

        const handleFocus = useCallback(
            (args: any) => {
                if (disabled || !editable) {
                    return;
                }

                setFocused(true);

                rest.onFocus?.(args);
            },
            [disabled, editable, rest],
        );

        const handleBlur = useCallback(
            (args: Object) => {
                if (!editable) {
                    return;
                }

                setFocused(false);
                rest.onBlur?.(args);
            },
            [editable, rest],
        );

        const handleLayoutAnimatedText = useCallback((e: LayoutChangeEvent) => {
            setLabelLayout({
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height,
                measured: true,
            });
        }, []);

        const forceFocus = useCallback(() => root.current?.focus(), []);

        const parentState = useMemo(
            () => ({
                labelAnimation,
                errorAnimation,
                focused,
                placeholder,
                value,
                labelLayout,
            }),
            [errorAnimation, focused, labelLayout, labelAnimation, placeholder, value],
        );

        return (
            <View style={containerStyle}>
                <TextInputBase
                    componentStyles={styles}
                    variant={variant}
                    size={size}
                    disabled={disabled}
                    error={errorProp}
                    multiline={multiline}
                    editable={editable}
                    required={required}
                    {...rest}
                    value={value}
                    parentState={parentState}
                    innerRef={ref => {
                        root.current = ref;
                    }}
                    onFocus={handleFocus}
                    forceFocus={forceFocus}
                    onBlur={handleBlur}
                    onChangeText={onChangeValue}
                    onLayoutAnimatedText={handleLayoutAnimatedText}
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                />
                <>
                    {(supportingText || required) && (
                        <HelperText
                            variant={errorProp ? 'error' : 'info'}
                            style={styles.supportingText}>
                            {supportingText || '*required'}
                        </HelperText>
                    )}
                </>
            </View>
        );
    },
);

export default memo(withActionState(TextInput));
