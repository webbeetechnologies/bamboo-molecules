import { memo } from 'react';
import CardTypography, { Props as TypographyProps } from './CardTypography';

export type Props = Omit<TypographyProps, 'variant'>;

const CardSubhead = ({ size = 'md', ...rest }: Props) => {
    return <CardTypography selectable={false} size={size} {...rest} variant="subhead" />;
};

export default memo(CardSubhead);
