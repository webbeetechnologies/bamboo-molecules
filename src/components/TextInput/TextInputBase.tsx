import { memo, useCallback, useMemo, useState } from 'react';
import {
    Animated,
    I18nManager,
    Platform,
    TextInput as NativeTextInput,
    LayoutChangeEvent,
    StyleSheet,
} from 'react-native';

import { useMolecules } from '../../hooks';
import InputLabel from './InputLabel';
import type { InputBaseProps, RenderProps } from './types';
import { styles as defaultStyles } from './utils';
import { normalizeBorderRadiuses, normalizeSpacings } from '../../utils';

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
    size,
    inputContainerStyle,
    inputStyle,
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
            leftElement,
            rightElement,
            activeIndicator,
            labelText,
            inputText,
            supportingText,
            placeholder,
            outline,

            // extracted styles
            fontSize,
            fontWeight,
            height,
            textAlign,
            activeColor,

            // custom props
            selectionColor,
            underlineColor,
            activeUnderlineColor,
            outlineColor,
            activeOutlineColor,
            placeholderTextColor,
            floatingLabelVerticalOffset,
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
            (I18nManager.isRTL ? 1 : -1) *
            (labelScale - 1 + labelHalfWidth - (labelScale * labelWidth) / 2);

        const normalizedLeftElementMarginRight = normalizeSpacings(leftElement, 'marginRight');

        const baseLabelTranslateXOutline =
            baseLabelTranslateX -
            leftElementLayout.width -
            (left ? normalizedLeftElementMarginRight : 0); // minus the width of the icon and the padding

        const backgroundColor = viewStyle?.backgroundColor || container?.backgroundColor; // to give the opportunity to change the backgroundColor of the TextInput with the StyleProp

        const viableRadiuses = normalizeBorderRadiuses(viewStyle); // to only extract the ones that are defined

        return {
            container: [container, viewStyle, viableRadiuses],
            leftElement,
            rightElement,
            activeIndicator,
            labelText,
            inputText,
            supportingText,

            placeholder,
            fontSize,
            fontWeight,
            height,
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
            floatingLabelVerticalOffset,
            labelWiggleXOffset,

            textInputStyle: [
                inputText,
                !multiline || (multiline && height) ? { height: inputHeight } : {},
                multiline && variant === 'outlined' && { paddingTop: 12 },
                {
                    textAlignVertical: multiline ? 'top' : 'center',
                    textAlign: textAlign ? textAlign : I18nManager.isRTL ? 'right' : 'left',
                },
                Platform.OS === 'web' && { outline: 'none' },
                inputStyle,
            ],
            inputContainerStyle: [
                defaultStyles.labelContainer,
                {
                    minHeight: inputMinHeight,
                },
                inputContainerStyle,
            ],
            underlineStyle: [
                defaultStyles.underline,
                activeIndicator,
                {
                    backgroundColor:
                        (hasActiveOutline ? activeUnderlineColor : underlineColor) ||
                        activeIndicator?.backgroundColor,
                },
            ],
            outlineStyle: [
                defaultStyles.outline,
                outline,
                {
                    borderColor:
                        (hasActiveOutline ? activeOutlineColor : outlineColor) ||
                        outline.borderColor,
                },
                backgroundColor ? { backgroundColor } : {},
                viableRadiuses,
            ],
            patchContainer: [
                StyleSheet.absoluteFill,
                {
                    backgroundColor,
                },
                defaultStyles.patchContainer,
            ],
        };
    }, [
        componentStyles,
        hasActiveOutline,
        inputContainerStyle,
        inputStyle,
        labelHalfWidth,
        labelHeight,
        labelWidth,
        left,
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
                    <View
                        style={styles.leftElement}
                        onLayout={handleLayoutLeftElement}
                        testID="text-input-left-element">
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

            <View style={styles.inputContainerStyle}>
                {Platform.OS !== 'android' && multiline && !!label && variant === 'flat' && (
                    // Workaround for: https://github.com/callstack/react-native-paper/issues/2799
                    // Patch for a multiline TextInput with fixed height, which allow to avoid covering input label with its value.
                    <View
                        testID="patch-container"
                        pointerEvents="none"
                        style={styles.patchContainer}
                    />
                )}

                <InputLabel
                    parentState={parentState}
                    label={label}
                    labelBackground={styles.backgroundColor}
                    floatingLabelVerticalOffset={styles.floatingLabelVerticalOffset}
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
                    size,
                })}
            </View>

            <>
                {right && (
                    <View style={styles.rightElement} testID="text-input-right-element">
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
