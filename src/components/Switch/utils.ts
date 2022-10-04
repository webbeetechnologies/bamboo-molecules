import { Platform } from 'react-native';
import setColor from 'color';

type BaseProps = {
    switchStyles: SwitchStyles;
    disabled?: boolean;
    value?: boolean;
};

type SwitchStyles = {
    checkedColor: string;
    thumbTintColor: string;
    onTintColor: string;
    onTintColorDisabled: string;
    thumbTintColorDisabled: string;
};

export const styles: SwitchStyles = {
    checkedColor: 'colors.primary',
    thumbTintColorDisabled: 'colors.disabled',
    thumbTintColor: 'color.tintColor',
    onTintColor: 'color.onTintColor',
    onTintColorDisabled: 'colors.disabledOnBackground',
};

const getCheckedColor = ({
    switchStyles,
    color,
}: {
    switchStyles: SwitchStyles;
    color?: string;
}) => {
    if (color) {
        return color;
    }

    return switchStyles?.checkedColor;
};

const getThumbTintColor = ({
    switchStyles,
    disabled,
    value,
    checkedColor,
}: BaseProps & { checkedColor: string }) => {
    const isIOS = Platform.OS === 'ios';

    if (isIOS) {
        return undefined;
    }

    if (disabled) {
        return switchStyles.thumbTintColorDisabled;
    }

    if (value) {
        return checkedColor;
    }

    return switchStyles.thumbTintColor;
};

const getOnTintColor = ({
    switchStyles,
    disabled,
    value,
    checkedColor,
}: BaseProps & { checkedColor: string }) => {
    const isIOS = Platform.OS === 'ios';

    if (isIOS) {
        return checkedColor;
    }

    if (disabled) {
        return switchStyles.onTintColorDisabled;
    }

    if (value) {
        return setColor(checkedColor).alpha(0.5).rgb().string();
    }

    return switchStyles.onTintColor;
};

export const getSwitchColor = ({
    switchStyles,
    disabled,
    value,
    color,
}: BaseProps & { color?: string }) => {
    const checkedColor = getCheckedColor({ switchStyles, color });

    return {
        onTintColor: getOnTintColor({ switchStyles, disabled, value, checkedColor }),
        thumbTintColor: getThumbTintColor({
            switchStyles,
            disabled,
            value,
            checkedColor,
        }),
        checkedColor,
    };
};
