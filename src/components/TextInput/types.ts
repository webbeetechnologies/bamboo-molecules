import type { ReactElement, MutableRefObject } from 'react';
import type {
    TextInput as NativeTextInput,
    Animated,
    TextStyle,
    ColorValue,
    StyleProp,
} from 'react-native';
import type { Props as TextInputProps } from './TextInput';

export type TextInputLabelProp = string | ReactElement;

export type TextInputSize = 'lg' | 'md' | 'sm';

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
    size?: TextInputSize;
    numberOfLines?: number;
    value?: string;
    adjustsFontSizeToFit?: boolean;
    testID?: string;
};

export type State = {
    labelAnimation: Animated.Value;
    errorAnimation: Animated.Value;
    focused: boolean;
    placeholder?: string;
    value?: string;
    labelLayout: { measured: boolean; width: number; height: number };
};

export type InputBaseProps = {
    parentState: State;
    innerRef: MutableRefObject<NativeTextInput>;
    onFocus?: (args: any) => void;
    onBlur?: (args: any) => void;
    forceFocus: () => void;
    onChangeText?: (value: string) => void;
    onLayoutAnimatedText: (args: any) => void;
    componentStyles: Record<string, any>;
} & Omit<
    TextInputProps,
    | 'style'
    | 'activeOutlineColor'
    | 'activeUnderlineColor'
    | 'underlineColor'
    | 'outlineColor'
    | 'placeholderTextColor'
    | 'selectionColor'
    | 'containerStyle'
>;

export type InputLabelProps = {
    parentState: State;
    labelBackground?: string;
    baseLabelTranslateX: number;
    wiggleOffsetX: number;
    labelScale: number;
    floatingLabelVerticalOffset?: number;
    paddingOffset?: { paddingLeft: number; paddingRight: number } | null;
    labelTranslationXOffset?: number;
    label?: TextInputLabelProp | null;
    error?: boolean | null;
    onLayoutAnimatedText: (args: any) => void;
    maxFontSizeMultiplier?: number | undefined | null;
    required?: boolean;
    testID?: string;
    style?: StyleProp<TextStyle>;
};

export type LabelBackgroundProps = {
    labelProps: InputLabelProps;
    labelStyle: any;
    parentState: State;
    maxFontSizeMultiplier?: number | undefined | null;
};
