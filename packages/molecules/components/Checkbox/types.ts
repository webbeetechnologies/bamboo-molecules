import type { StyleProp, TextStyle } from 'react-native';
import type { TouchableRippleProps } from '../TouchableRipple';

export type Size = 'sm' | 'md' | 'lg';
export type States = 'disabled' | 'checked' | 'hovered' | 'checkedAndHovered';

export type CheckBoxBaseProps = Omit<TouchableRippleProps, 'children'> & {
    /**
     * value of checkbox.
     */
    value?: boolean;
    /**
     * defaultValue of checkbox.
     */
    defaultValue?: boolean;
    /**
     * function execute when the value change i.e checkbox is press
     */
    onChange?: (newValue: boolean) => void;
    /**
     * Whether or not if it's in the indeterminate state, if true, it will override the value
     */
    indeterminate?: boolean;
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icon.
     * Should be a number or a Design Token
     */
    size?: Size;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * Accessibility label for the touchable. This is read by the screen reader when the user taps the touchable.
     */
    accessibilityLabel?: string;
    /**
     * testID to be used on tests.
     */
    testID?: string;

    style?: StyleProp<TextStyle>;
};
