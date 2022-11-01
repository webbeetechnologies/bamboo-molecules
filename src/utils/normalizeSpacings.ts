import { I18nManager } from 'react-native';

export type SpacingKey =
    | 'margin'
    | 'marginBottom'
    | 'marginEnd'
    | 'marginHorizontal'
    | 'marginLeft'
    | 'marginRight'
    | 'marginStart'
    | 'marginTop'
    | 'marginVertical'
    | 'padding'
    | 'paddingBottom'
    | 'paddingEnd'
    | 'paddingHorizontal'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingStart'
    | 'paddingTop'
    | 'paddingVertical';

export type SpacingType =
    | 'paddingTop'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'paddingRight'
    | 'marginTop'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight';

type StyleObject = Record<SpacingKey, number>; // only support number values

const normalizeMarginRight = (styleObj: StyleObject) => {
    return (
        styleObj?.marginHorizontal ||
        styleObj?.marginRight ||
        styleObj?.margin ||
        (I18nManager.isRTL ? styleObj?.marginStart : styleObj?.marginEnd) ||
        0
    );
};

const normalizeMarginLeft = (styleObj: StyleObject) => {
    return (
        styleObj?.marginHorizontal ||
        styleObj?.marginLeft ||
        styleObj?.margin ||
        (I18nManager.isRTL ? styleObj?.marginEnd : styleObj?.marginStart) ||
        0
    );
};

const normalizeMarginTop = (styleObj: StyleObject) => {
    return styleObj?.marginVertical || styleObj?.marginTop || styleObj?.margin || 0;
};

const normalizeMarginBottom = (styleObj: StyleObject) => {
    return styleObj?.marginVertical || styleObj?.marginBottom || styleObj?.margin || 0;
};

const normalizePaddingRight = (styleObj: StyleObject) => {
    return (
        styleObj?.paddingHorizontal ||
        styleObj?.paddingRight ||
        styleObj?.padding ||
        (I18nManager.isRTL ? styleObj?.paddingStart : styleObj?.paddingEnd) ||
        0
    );
};

const normalizePaddingLeft = (styleObj: StyleObject) => {
    return (
        styleObj?.paddingHorizontal ||
        styleObj?.paddingLeft ||
        styleObj?.padding ||
        (I18nManager.isRTL ? styleObj?.paddingEnd : styleObj?.paddingStart) ||
        0
    );
};

const normalizePaddingTop = (styleObj: StyleObject) => {
    return styleObj?.paddingVertical || styleObj?.paddingTop || styleObj?.padding || 0;
};

const normalizePaddingBottom = (styleObj: StyleObject) => {
    return styleObj?.paddingVertical || styleObj?.paddingBottom || styleObj?.padding || 0;
};

export const normalizeSpacings = (styleObj: StyleObject, spacingType: SpacingType) => {
    switch (spacingType) {
        case 'paddingTop':
            return normalizePaddingTop(styleObj);
        case 'paddingBottom':
            return normalizePaddingBottom(styleObj);
        case 'paddingLeft':
            return normalizePaddingLeft(styleObj);
        case 'paddingRight':
            return normalizePaddingRight(styleObj);
        case 'marginTop':
            return normalizeMarginTop(styleObj);
        case 'marginBottom':
            return normalizeMarginBottom(styleObj);
        case 'marginLeft':
            return normalizeMarginLeft(styleObj);
        case 'marginRight':
            return normalizeMarginRight(styleObj);
    }
};
