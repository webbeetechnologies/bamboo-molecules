import type { StyleProp, TextStyle } from 'react-native';
import type { TouchableRippleProps } from '../TouchableRipple';

export type CheckBoxBaseProps = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Status of checkbox.
     */
    status: 'checked' | 'unchecked' | 'indeterminate';
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icon.
     * Should be a number or a Design Token
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
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
