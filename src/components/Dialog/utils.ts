import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = '';

type CustomProps = {
    container?: ViewStyle;
    spacing?: string;
};

export const dialogStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    spacing: 'spacings.6',
    justifyContent: 'flex-start',
    borderRadius: 'shapes.corner.extraLarge' as unknown as number,
    backgroundColor: 'colors.surface',
    maxWidth: 560,
};

export const dialogTitleStyles: ComponentStylePropWithVariants<TextStyle, ''> = {
    marginHorizontal: 'spacings.6',
    marginVertical: 'spacings.3',
    color: 'colors.onSurface',
    fontSize: 'typescale.headlineSmall.fontSize' as unknown as number,
    fontWeight: 'typescale.headlineSmall.fontWeight' as unknown as TextStyle['fontWeight'],
    fontFamily: 'typescale.headlineSmall.fontFamily',
    lineHeight: 'typescale.headlineSmall.lineHeight' as unknown as number,
    letterSpacing: 'typescale.headlineSmall.letterSpacing' as unknown as number,
};

export const dialogScrollAreaStyles: ComponentStylePropWithVariants<ViewStyle, ''> = {
    flexGrow: 1,
    flexShrink: 1,
    marginBottom: 'spacings.6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'colors.surfaceVariant',
};

export const dialogIconStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    { container: ViewStyle }
> = {
    color: 'colors.secondary',
    paddingTop: 'spacings.6',

    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export const dialogContentStyles: ComponentStylePropWithVariants<TextStyle, ''> = {
    paddingBottom: 'spacings.6',
    paddingHorizontal: 'spacings.6',
    flex: 1,
};

export const dialogActionsStyles: ComponentStylePropWithVariants<
    {},
    '',
    { spacing: string; container: ViewStyle }
> = {
    spacing: 'spacings.2',

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 'spacings.6',
        paddingHorizontal: 'spacings.6',
    },
};
