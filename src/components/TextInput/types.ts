import type { ReactElement } from 'react';
import type {
    TextInput as NativeTextInput,
    Animated,
    TextStyle,
    LayoutChangeEvent,
    ColorValue,
    StyleProp,
} from 'react-native';
import type { Props as TextInputProps } from './TextInput';

export type TextInputLabelProp = string | ReactElement;

export type RenderProps = {
    ref: (a?: NativeTextInput | null) => void;
    onChangeText?: (a: string) => void;
    placeholder?: string;
    placeholderTextColor?: ColorValue;
    editable?: boolean;
    selectionColor?: string;
    onFocus?: (args: any) => void;
    onBlur?: (args: any) => void;
    underlineColorAndroid?: string;
    style: any;
    multiline?: boolean;
    numberOfLines?: number;
    value?: string;
    adjustsFontSizeToFit?: boolean;
    testID?: string;
};

export type State = {
    labeled: Animated.Value;
    error: Animated.Value;
    focused: boolean;
    placeholder?: string;
    value?: string;
    labelLayout: { measured: boolean; width: number; height: number };
    leftLayout: { height: number | null; width: number | null };
    rightLayout: { height: number | null; width: number | null };
};

export type InputBaseProps = {
    parentState: State;
    innerRef: (ref?: NativeTextInput | null) => void;
    onFocus?: (args: any) => void;
    onBlur?: (args: any) => void;
    forceFocus: () => void;
    onChangeText?: (value: string) => void;
    onLayoutAnimatedText: (args: any) => void;
    onLeftAffixLayoutChange: (event: LayoutChangeEvent) => void;
    onRightAffixLayoutChange: (event: LayoutChangeEvent) => void;
} & TextInputProps;

export type InputLabelProps = {
    parentState: State;
    labelBackground?: any;
    placeholderStyle: any;
    baseLabelTranslateX: number;
    wiggleOffsetX: number;
    labelScale: number;
    paddingOffset?: { paddingLeft: number; paddingRight: number } | null;
    labelTranslationXOffset?: number;
    backgroundColor?: ColorValue;
    label?: TextInputLabelProp | null;
    hasActiveOutline?: boolean | null;
    errorColor?: string;
    error?: boolean | null;
    onLayoutAnimatedText: (args: any) => void;
    maxFontSizeMultiplier?: number | undefined | null;
    inputHeight: number;
    testID?: string;
    style?: StyleProp<TextStyle>;
};

export type LabelBackgroundProps = {
    labelProps: InputLabelProps;
    labelStyle: any;
    parentState: State;
    maxFontSizeMultiplier?: number | undefined | null;
};
