import color from 'color';

export interface TouchableRippleStyles {
    rippleColor: string;
}

export const touchableRippleStyles: TouchableRippleStyles = {
    rippleColor: 'colors.onSurface',
};

const getUnderlayColor = ({
    calculatedRippleColor,
    underlayColor,
}: {
    calculatedRippleColor: string;
    underlayColor?: string;
}) => {
    if (underlayColor != null) {
        return underlayColor;
    }

    return color(calculatedRippleColor).rgb().string();
};

const getRippleColor = ({
    rippleStyles,
    rippleColor,
}: {
    rippleStyles: TouchableRippleStyles;
    rippleColor?: string;
}) => {
    if (rippleColor) {
        return rippleColor;
    }

    return rippleStyles.rippleColor === 'colors.onSurface'
        ? color(rippleStyles.rippleColor).alpha(0.12).rgb().string()
        : rippleStyles.rippleColor;
};

export const getTouchableRippleColors = ({
    rippleStyles,
    rippleColor,
    underlayColor,
}: {
    rippleColor?: string;
    underlayColor?: string;
    rippleStyles: TouchableRippleStyles;
}) => {
    const calculatedRippleColor = getRippleColor({ rippleStyles, rippleColor });

    return {
        calculatedRippleColor,
        calculatedUnderlayColor: getUnderlayColor({
            calculatedRippleColor,
            underlayColor,
        }),
    };
};
