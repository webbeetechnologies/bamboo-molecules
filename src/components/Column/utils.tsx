import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

const generateColStyles = (numCols: number) => {
    let styles: any = {};
    for (let i = 1; i <= numCols; i++) {
        styles[`col-${i}`] = {
            flexGrow: i,
            flexShrink: 0,
        };
    }
    return styles;
};

type CustomProps = {
    [key: string]: ViewStyle;
};

export const columnStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> =
    generateColStyles(12);
