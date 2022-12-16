import { memo } from 'react';
import type { TextProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = TextProps & {
    variant?: 'title' | 'subtitle' | 'description';
    size?: 'sm' | 'md' | 'lg';
};

const CardText = ({ style, variant = 'description', size = 'md', ...rest }: Props) => {
    const { Text } = useMolecules();
    const componentStyles = useComponentStyles('Card_Text', style, {
        variant,
        size,
    });

    return <Text selectable={false} {...rest} style={componentStyles} />;
};

CardText.displayName = 'Card.Text';

export default memo(CardText);
