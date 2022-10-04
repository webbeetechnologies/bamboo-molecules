import color from 'color';

export const black = '#000000';
export const white = '#ffffff';

export type ButtonVariant = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

type BaseProps = {
    isVariant: (variant: ButtonVariant) => boolean;
    variant: ButtonVariant;
    buttonStyles: typeof stateBasedStyles;
    disabled?: boolean;
};

const stateBasedStyles = {
    disabled: {
        backgroundColor: {
            outlined: 'transparent',
            text: 'transparent',
            default: 'colors.surfaceDisabled',
        },
        textColor: {
            default: 'colors.onSurfaceDisabled',
        },
        borderColor: {
            outlined: 'colors.surfaceDisabled',
            default: 'transparent',
        },
    },
    default: {
        backgroundColor: {
            elevated: 'colors.elevation.level1',
            contained: 'colors.primary',
            'contained-tonal': 'colors.secondaryContainer',
            outlined: 'transparent',
            text: 'transparent',
        },
        textColor: {
            contained: 'colors.onPrimary',
            'contained-tonal': 'colors.onSecondaryContainer',
            outlined: 'colors.primary',
            elevated: 'colors.primary',
            text: 'colors.primary',
        },
        borderColor: {
            outlined: 'colors.outline',
            default: 'transparent',
        },
        borderWidth: {
            outlined: 1,
            default: 0,
        },
    },
};

export const styles = {
    ...stateBasedStyles,
    button: {
        minWidth: 64,
        borderStyle: 'solid',
    },
    compact: {
        minWidth: 'auto',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 12,
        marginRight: -4,
    },
    iconReverse: {
        marginRight: 12,
        marginLeft: -4,
    },
    md3Icon: {
        marginLeft: 16,
        marginRight: -16,
    },
    md3IconReverse: {
        marginLeft: -16,
        marginRight: 16,
    },
    md3IconTextMode: {
        marginLeft: 12,
        marginRight: -8,
    },
    md3IconReverseTextMode: {
        marginLeft: -8,
        marginRight: 12,
    },
    label: {
        textAlign: 'center',
        marginVertical: 9,
        marginHorizontal: 16,
    },
    md2Label: {
        letterSpacing: 1,
    },
    compactLabel: {
        marginHorizontal: 8,
    },
    uppercaseLabel: {
        textTransform: 'uppercase',
    },
    md3Label: {
        marginVertical: 10,
        marginHorizontal: 24,
    },
    md3LabelText: {
        marginHorizontal: 12,
    },
    md3LabelTextAddons: {
        marginHorizontal: 16,
    },
};

const isDark = ({ dark, backgroundColor }: { dark?: boolean; backgroundColor?: string }) => {
    if (typeof dark === 'boolean') {
        return dark;
    }

    if (backgroundColor === 'transparent') {
        return false;
    }

    if (backgroundColor !== 'transparent') {
        return !color(backgroundColor).isLight();
    }

    return false;
};

const getButtonBackgroundColor = ({
    variant,
    buttonStyles,
    disabled,
    customButtonColor,
}: BaseProps & {
    customButtonColor?: string;
    colorMode: 'light' | 'dark';
}) => {
    if (customButtonColor && !disabled) {
        return customButtonColor;
    }

    if (disabled) {
        return buttonStyles.disabled.backgroundColor[
            variant === 'outlined' || variant === 'text' ? variant : 'default'
        ];
    }

    return buttonStyles.default.backgroundColor[variant];
};

const getButtonTextColor = ({
    isVariant,
    variant,
    buttonStyles,
    disabled,
    customTextColor,
    backgroundColor,
    dark,
}: BaseProps & {
    customTextColor?: string;
    backgroundColor: string;
    dark?: boolean;
}) => {
    if (customTextColor && !disabled) {
        return customTextColor;
    }

    if (disabled) {
        return buttonStyles.disabled.textColor.default;
    }

    if (typeof dark === 'boolean') {
        if (isVariant('contained') || isVariant('contained-tonal') || isVariant('elevated')) {
            return isDark({ dark, backgroundColor }) ? white : black;
        }
    }

    return buttonStyles.default.textColor[variant];
};

const getButtonBorderColor = ({
    isVariant,
    disabled,
    buttonStyles,
}: Omit<BaseProps, 'variant'>) => {
    return buttonStyles[disabled ? 'disabled' : 'default'].borderColor[
        isVariant('outlined') ? 'outlined' : 'default'
    ];
};

const getButtonBorderWidth = ({
    isVariant,
    buttonStyles,
}: Omit<BaseProps, 'disabled' | 'variant'>) => {
    return buttonStyles.default.borderWidth[isVariant('outlined') ? 'outlined' : 'default'];
};

export const getButtonColors = ({
    buttonStyles,
    variant,
    customButtonColor,
    customTextColor,
    disabled,
    dark,
    colorMode,
}: {
    buttonStyles: typeof stateBasedStyles;
    variant: ButtonVariant;
    customButtonColor?: string;
    customTextColor?: string;
    disabled?: boolean;
    dark?: boolean;
    colorMode: 'light' | 'dark';
}) => {
    const isVariant = (variantToCompare: ButtonVariant) => {
        return variant === variantToCompare;
    };

    const backgroundColor = getButtonBackgroundColor({
        isVariant,
        variant,
        buttonStyles,
        disabled,
        customButtonColor,
        colorMode,
    });

    const textColor = getButtonTextColor({
        isVariant,
        variant,
        buttonStyles,
        disabled,
        customTextColor,
        backgroundColor,
        dark,
    });

    const borderColor = getButtonBorderColor({ isVariant, buttonStyles, disabled });

    const borderWidth = getButtonBorderWidth({ isVariant, buttonStyles });

    return {
        backgroundColor,
        borderColor,
        textColor,
        borderWidth,
    };
};
