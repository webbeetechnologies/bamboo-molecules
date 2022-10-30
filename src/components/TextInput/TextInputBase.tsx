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
import { styles as defaultStyles } from './utils';

const TextInputBase = ({
    componentStyles,
    variant = 'flat',
    disabled = false,
    editable = true,
    label,
    error = false,
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
            // style objects
            container,
            leadingIcon,
            trailingIcon,
            activeIndicator,
            labelText,
            inputText,
            supportingText,
            placeholder,
            outline,

            // extracted styles
            backgroundColor,
            fontSize,
            fontWeight,
            height,
            paddingHorizontal,
            textAlign,
            activeColor,

            // custom props
            selectionColor,
            underlineColor,
            activeUnderlineColor,
            outlineColor,
            activeOutlineColor,
            placeholderTextColor,
            floatingLabelHorizontalOffset,
            inputMinHeight,
            minimizedLabelFontSize,
            maximizedLabelFontSize,
            labelWiggleXOffset,
            ...viewStyle
        } = componentStyles;

        const finalHeight = height > 0 ? height : labelHeight;

        const inputHeight = finalHeight < inputMinHeight ? inputMinHeight : finalHeight;

        const labelScale = minimizedLabelFontSize / (fontSize || maximizedLabelFontSize);

        const baseLabelTranslateX =
            (I18nManager.isRTL ? 1 : -1) * (labelHalfWidth - (labelScale * labelWidth) / 2) +
            (1 - labelScale) * (I18nManager.isRTL ? -1 : 1) * (paddingHorizontal || 0);

        const baseLabelTranslateXOutline =
            baseLabelTranslateX - container?.paddingHorizontal - (leftElementLayout.width || 0); // minus the width of the icon and the padding

        return {
            container: [container, viewStyle],
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

            activeColor,
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
            labelWiggleXOffset,

            textInputStyle: [
                inputText,
                { paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal },
                !multiline || (multiline && height) ? { height: inputHeight } : {},
                {
                    textAlignVertical: multiline ? 'top' : 'center',
                    textAlign: textAlign ? textAlign : I18nManager.isRTL ? 'right' : 'left',
                },
                Platform.OS === 'web' && { outline: 'none' },
            ],
            labelContainerStyle: [
                defaultStyles.labelContainer,
                {
                    minHeight: inputMinHeight,
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
        hasActiveOutline,
        labelHalfWidth,
        labelHeight,
        labelWidth,
        leftElementLayout.width,
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
                    wiggleOffsetX={styles.labelWiggleXOffset}
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
