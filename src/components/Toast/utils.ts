import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

export type CustomProps = {
    container?: ViewStyle;
    textContainer?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    actionButton?: ViewStyle;
    iconButton?: TextStyle;
};

export const materialToastStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    container: {
        minHeight: 48,
        backgroundColor: 'colors.surface',
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
        paddingLeft: 'spacings.4',
        paddingRight: 'spacings.2',
        paddingVertical: 'spacings.3',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        width: 280,
        flexGrow: 1,
    },
    title: {
        color: 'colors.onSurface',
        fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
        fontWeight: 'typescale.bodyMedium.fontWeight' as unknown as TextStyle['fontWeight'],
        lineHeight: 'typescale.bodyMedium.fontSize' as unknown as number,
    },
    description: {
        color: 'colors.onSurface',
        fontSize: 'typescale.labelSmall.fontSize' as unknown as number,
        fontWeight: 'typescale.labelSmall.fontWeight' as unknown as TextStyle['fontWeight'],
        lineHeight: 'typescale.labelSmall.fontSize' as unknown as number,
        marginTop: 'spacings.1',
    },
    actionButton: {
        marginLeft: 'spacings.3',
        flexGrow: 1,
    },
    iconButton: {
        marginLeft: 'spacings.3',
        marginRight: 'spacings.1',
        color: 'colors.onSurface',
    },
};
