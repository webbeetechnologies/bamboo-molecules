import { memo, useCallback, useMemo, useState } from 'react';
import {
    Animated,
    I18nManager,
    Platform,
    TextInput as NativeTextInput,
    LayoutChangeEvent,
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
    variant = 'flat',
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
    const hasActiveOutline = parentState.focused || error;

    const { View } = useMolecules();

    const labelWidth = parentState.labelLayout.width;
    const labelHeight = parentState.labelLayout.height;
    const labelHalfWidth = labelWidth / 2;

    const minInputHeight = dense
        ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) - LABEL_PADDING_TOP_DENSE
        : MD3_MIN_HEIGHT - MD3_LABEL_PADDING_TOP;

    const [leftElementLayout, setElementLayout] = useState<{
        measured: boolean;
        width: number;
        height: number;
    }>({
        measured: false,
        width: 0,
        height: 0,
    });

    const handleLayoutLeftElement = useCallback((e: LayoutChangeEvent) => {
        setElementLayout({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
            measured: true,
        });
    }, []);

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
            backgroundColor,
            floatingLabelHorizontalOffset,
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

        const baseLabelTranslateXOutline =
            baseLabelTranslateX - container?.paddingHorizontal - (leftElementLayout.width || 0); // minus the width of the icon and the padding

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
            backgroundColor,
            baseLabelTranslateX:
                variant === 'outlined' ? baseLabelTranslateXOutline : baseLabelTranslateX,
            labelScale,
            selectionColor: selectionColor || activeColor,
            underlineColor,
            activeUnderlineColor,
            outlineColor,
            activeOutlineColor,
            placeholderTextColor: placeholderTextColor || placeholder?.color,
            floatingLabelHorizontalOffset,
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
                backgroundColor ? { backgroundColor } : {},
            ],
        };
    }, [
        componentStyles,
        dense,
        hasActiveOutline,
        label,
        labelHalfWidth,
        labelHeight,
        labelWidth,
        leftElementLayout.width,
        minInputHeight,
        multiline,
        variant,
    ]);

    return (
        <View style={styles.container}>
            {variant === 'flat' ? (
                <Animated.View testID="text-input-underline" style={styles.underlineStyle} />
            ) : (
                <Animated.View
                    testID="text-input-outline"
                    pointerEvents="none"
                    style={styles.outlineStyle}
                />
            )}

            <>
                {left && (
                    <View style={styles.leadingIcon} onLayout={handleLayoutLeftElement}>
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
                <InputLabel
                    parentState={parentState}
                    label={label}
                    labelBackground={styles.backgroundColor}
                    floatingLabelHorizontalOffset={styles.floatingLabelHorizontalOffset}
                    required={required}
                    onLayoutAnimatedText={onLayoutAnimatedText}
                    error={error}
                    baseLabelTranslateX={styles.baseLabelTranslateX}
                    labelScale={styles.labelScale}
                    wiggleOffsetX={LABEL_WIGGLE_X_OFFSET}
                    maxFontSizeMultiplier={rest.maxFontSizeMultiplier}
                    testID={testID}
                    style={styles.labelText}
                />

                {render({
                    testID: `${testID}-${variant}`,
                    ...rest,
                    style: styles.textInputStyle,
                    ref: innerRef,
                    onChangeText,
                    placeholder: label ? parentState.placeholder : rest.placeholder,
                    placeholderTextColor: styles.placeholderTextColor,
                    editable: !disabled && editable,
                    selectionColor: styles.selectionColor,
                    onFocus,
                    onBlur,
                    underlineColorAndroid: 'transparent',
                    multiline,
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
