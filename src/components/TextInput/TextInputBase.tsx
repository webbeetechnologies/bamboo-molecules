import { memo, useMemo } from 'react';
import {
    Animated,
    StyleSheet,
    I18nManager,
    Platform,
    ViewStyle,
    TextInput as NativeTextInput,
} from 'react-native';

import { useMolecules } from '../../hooks';
import InputLabel from './InputLabel';
import type { InputBaseProps, RenderProps } from './types';
// TODO replace this with tokens
import {
    MINIMIZED_LABEL_FONT_SIZE,
    LABEL_WIGGLE_X_OFFSET,
    LABEL_PADDING_TOP_DENSE,
    MIN_DENSE_HEIGHT_WL,
    MIN_DENSE_HEIGHT,
    MAXIMIZED_LABEL_FONT_SIZE,
    MD3_MIN_HEIGHT,
    MD3_LABEL_PADDING_TOP,
} from './constants';
import { styles as defaultStyles } from './utils';

const TextInputBase = ({
    componentStyles,
    variant,
    disabled = false,
    editable = true,
    label,
    error = false,
    dense,
    multiline = false,
    parentState,
    innerRef,
    onFocus,
    onBlur,
    onChangeText,
    onLayoutAnimatedText,
    left,
    right,
    render = (props: RenderProps) => <NativeTextInput {...props} />,
    forceFocus,
    testID = 'text-input',
    required,
    ...rest
}: InputBaseProps) => {
    const isAndroid = Platform.OS === 'android';
    const hasActiveOutline = parentState.focused || error;

    const { View } = useMolecules();

    const labelWidth = parentState.labelLayout.width;
    const labelHeight = parentState.labelLayout.height;
    const labelHalfWidth = labelWidth / 2;
    // const labelHalfHeight = labelHeight / 2;

    const minInputHeight = dense
        ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) - LABEL_PADDING_TOP_DENSE
        : MD3_MIN_HEIGHT - MD3_LABEL_PADDING_TOP;

    const styles = useMemo(() => {
        const {
            activeColor,
            container,
            leadingIcon,
            trailingIcon,
            activeIndicator,
            labelText,
            inputText,
            supportingText,
            placeholder,
            outline,
            fontSize,
            fontWeight,
            height,
            paddingHorizontal,
            textAlign,
            selectionColor,
            underlineColor,
            activeUnderlineColor,
            outlineColor,
            activeOutlineColor,
            placeholderTextColor,
            ...viewStyle
        } = componentStyles;

        // TODO replace this with sizes // 'dense' | 'labeled-dense' | 'regular' | 'labeled-regular'
        const minHeight =
            height || (dense ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) : MD3_MIN_HEIGHT);

        const finalHeight = height > 0 ? height : labelHeight;

        const inputHeight =
            height > 0 ? height : finalHeight < minInputHeight ? minInputHeight : finalHeight;

        const flatHeight =
            inputHeight + (!height ? (dense ? LABEL_PADDING_TOP_DENSE : MD3_LABEL_PADDING_TOP) : 0);

        const labelScale = MINIMIZED_LABEL_FONT_SIZE / (fontSize || MAXIMIZED_LABEL_FONT_SIZE);

        const baseLabelTranslateX =
            (I18nManager.isRTL ? 1 : -1) * (labelHalfWidth - (labelScale * labelWidth) / 2) +
            (1 - labelScale) * (I18nManager.isRTL ? -1 : 1) * (paddingHorizontal || 0);

        return {
            activeColor,
            container: [container, viewStyle, { height }],
            leadingIcon,
            trailingIcon,
            activeIndicator,
            labelText,
            inputText,
            supportingText,
            placeholder,
            fontSize,
            fontWeight,
            height,
            paddingHorizontal,
            textAlign,
            backgroundColor: viewStyle?.backgroundColor,
            baseLabelTranslateX,
            labelScale,
            selectionColor: selectionColor || activeColor,
            underlineColor,
            activeUnderlineColor,
            outlineColor,
            activeOutlineColor,
            placeholderTextColor: placeholderTextColor || placeholder?.color,
            textInputStyle: [
                inputText,
                { paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal },
                !multiline || (multiline && height) ? { height: flatHeight } : {},
                // TODO replace this with sizes // 'dense' | 'labeled-dense' | 'regular' | 'labeled-regular'
                dense ? defaultStyles.inputFlatDense : defaultStyles.inputFlat,
                {
                    textAlignVertical: multiline ? 'top' : 'center',
                    textAlign: textAlign ? textAlign : I18nManager.isRTL ? 'right' : 'left',
                },
                Platform.OS === 'web' && { outline: 'none' },
            ],
            patchContainerStyle: [
                StyleSheet.absoluteFill,
                // TODO replace this with sizes // 'dense' | 'labeled-dense' | 'regular' | 'labeled-regular'
                dense ? defaultStyles.densePatchContainer : defaultStyles.patchContainer,
                {
                    backgroundColor:
                        viewStyle.backgroundColor || (container as ViewStyle)?.backgroundColor,
                    left: paddingHorizontal,
                    right: paddingHorizontal,
                },
            ],
            labelContainerStyle: [
                defaultStyles.labelContainer,
                {
                    minHeight,
                },
            ],
            underlineStyle: [
                defaultStyles.underline,
                activeIndicator,
                {
                    backgroundColor:
                        (hasActiveOutline ? underlineColor : activeUnderlineColor) ||
                        activeIndicator?.backgroundColor,
                },
            ],
            outlineStyle: [
                defaultStyles.outline,
                outline,
                {
                    borderColor:
                        (hasActiveOutline ? outlineColor : activeOutlineColor) ||
                        outline.borderColor,
                },
            ],
            inputHeight: height || minHeight,
        };
    }, [
        componentStyles,
        dense,
        hasActiveOutline,
        label,
        labelHalfWidth,
        labelHeight,
        labelWidth,
        minInputHeight,
        multiline,
    ]);

    return (
        <View style={styles.container}>
            {variant === 'flat' ? (
                <Animated.View style={styles.underlineStyle} />
            ) : (
                <Animated.View
                    testID="text-input-outline"
                    pointerEvents="none"
                    style={styles.outlineStyle}
                />
            )}

            <>
                {left && (
                    <View style={styles.leadingIcon}>
                        {typeof left === 'function'
                            ? left?.({
                                  color: styles.activeColor,
                                  forceFocus,
                                  focused: parentState.focused,
                              })
                            : left}
                    </View>
                )}
            </>

            <View style={styles.labelContainerStyle}>
                {!isAndroid && multiline && !!label && (
                    // Workaround for: https://github.com/callstack/react-native-paper/issues/2799
                    // Patch for a multiline TextInput with fixed height, which allow to avoid covering input label with its value.
                    <View
                        testID="patch-container"
                        pointerEvents="none"
                        style={styles.patchContainerStyle}
                    />
                )}
                <InputLabel
                    parentState={parentState}
                    label={`${label}${required ? '*' : ''}`}
                    onLayoutAnimatedText={onLayoutAnimatedText}
                    error={error}
                    placeholderStyle={styles.placeholder}
                    baseLabelTranslateX={styles.baseLabelTranslateX}
                    labelScale={styles.labelScale}
                    wiggleOffsetX={LABEL_WIGGLE_X_OFFSET}
                    hasActiveOutline={hasActiveOutline}
                    maxFontSizeMultiplier={rest.maxFontSizeMultiplier}
                    inputHeight={styles.inputHeight}
                    testID={testID}
                    style={styles.labelText}
                />

                {render({
                    testID: `${testID}-flat`,
                    style: styles.textInputStyle,
                    ref: innerRef,
                    onChangeText: onChangeText,
                    placeholder: label ? parentState.placeholder : rest.placeholder,
                    placeholderTextColor: styles.placeholderTextColor,
                    editable: !disabled && editable,
                    selectionColor: styles.selectionColor,
                    onFocus: onFocus,
                    onBlur: onBlur,
                    underlineColorAndroid: 'transparent',
                    multiline: multiline,
                })}
            </View>

            <>
                {right && (
                    <View style={styles.trailingIcon}>
                        {typeof right === 'function'
                            ? right?.({
                                  color: styles.activeColor,
                                  forceFocus,
                                  focused: parentState.focused,
                              })
                            : right}
                    </View>
                )}
            </>
        </View>
    );
};

export default memo(TextInputBase);
