import { forwardRef, memo } from 'react';
import type { TextProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = TextProps & {
    variant?: 'headline' | 'subhead' | 'text';
    size?: 'sm' | 'md' | 'lg';
};

const CardTypography = ({ style, variant = 'text', size = 'md', ...rest }: Props, ref: any) => {
    const { Text } = useMolecules();
    const componentStyles = useComponentStyles('Card_Typography', style, {
        variant,
        size,
    });

    return <Text ref={ref} selectable={false} {...rest} style={componentStyles} />;
};

export default memo(forwardRef(CardTypography));
