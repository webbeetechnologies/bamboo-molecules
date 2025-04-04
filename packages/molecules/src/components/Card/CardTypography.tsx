import { forwardRef, memo, useMemo } from 'react';
import { Text, type TextProps } from 'react-native';
import { cardTypograhyStyles } from './utils';

export type Props = TextProps & {
    variant?: 'headline' | 'subhead' | 'text';
    size?: 'sm' | 'md' | 'lg';
};

const CardTypography = ({ style, variant = 'text', size = 'md', ...rest }: Props, ref: any) => {
    cardTypograhyStyles.useVariants({
        variant,
        // @ts-ignore
        size,
    });
    const componentStyles = useMemo(() => [cardTypograhyStyles.root, style], [style]);

    return <Text ref={ref} selectable={false} {...rest} style={componentStyles} />;
};

export default memo(forwardRef(CardTypography));
