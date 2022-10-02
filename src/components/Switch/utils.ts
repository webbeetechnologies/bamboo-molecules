import { Platform } from 'react-native';
import setColor from 'color';

import { grey400, grey800, grey50, grey700, white, black } from '../../styles/colors';

type BaseProps = {
    switchStyles: SwitchStyles;
    disabled?: boolean;
    value?: boolean;
    colorMode: 'light' | 'dark';
};

type SwitchStyles = {
    checkedColor: string;
    thumbTintColor: {
        disabled: {
            dark: string;
            light: string;
        };
        dark: string;
        light: string;
    };
    onTintColor: {
        disabled: {
            dark: string;
            light: string;
        };
        dark: string;
        light: string;
    };
};

export const styles: SwitchStyles = {
    checkedColor: 'colors.primary',
    thumbTintColor: {
        disabled: {
            dark: grey800,
            light: grey400,
        },
        dark: grey400,
        light: grey50,
    },
    onTintColor: {
        disabled: {
            dark: setColor(white).alpha(0.06).rgb().string(),
            light: setColor(black).alpha(0.12).rgb().string(),
        },
        dark: grey700,
        light: 'rgb(178, 175, 177)',
    },
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
    colorMode,
}: BaseProps & { checkedColor: string }) => {
    const isIOS = Platform.OS === 'ios';

    if (isIOS) {
        return undefined;
    }

    if (disabled) {
        if (colorMode === 'dark') {
            return switchStyles?.thumbTintColor?.dark;
        }
        return switchStyles?.thumbTintColor?.light;
    }

    if (value) {
        return checkedColor;
    }

    if (colorMode === 'dark') {
        return switchStyles?.thumbTintColor?.dark;
    }
    return switchStyles?.thumbTintColor?.light;
};

const getOnTintColor = ({
    switchStyles,
    disabled,
    value,
    checkedColor,
    colorMode,
}: BaseProps & { checkedColor: string }) => {
    const isIOS = Platform.OS === 'ios';

    if (isIOS) {
        return checkedColor;
    }

    if (disabled) {
        if (colorMode === 'dark') {
            return switchStyles?.onTintColor?.disabled?.dark;
        }
        return switchStyles?.onTintColor?.disabled?.light;
    }

    if (value) {
        return setColor(checkedColor).alpha(0.5).rgb().string();
    }

    if (colorMode === 'dark') {
        return switchStyles?.onTintColor?.dark;
    }
    return switchStyles?.onTintColor?.light;
};

export const getSwitchColor = ({
    switchStyles,
    disabled,
    value,
    color,
    colorMode,
}: BaseProps & { color?: string }) => {
    const checkedColor = getCheckedColor({ switchStyles, color });

    return {
        onTintColor: getOnTintColor({ switchStyles, disabled, value, checkedColor, colorMode }),
        thumbTintColor: getThumbTintColor({
            switchStyles,
            disabled,
            value,
            checkedColor,
            colorMode,
        }),
        checkedColor,
    };
};
