import { memo } from 'react';
import CardTypography, { Props as TypographyProps } from './CardTypography';

export type Props = Omit<TypographyProps, 'variant'>;

const CardHeadline = ({ size = 'md', ...rest }: Props) => {
    return <CardTypography selectable={false} size={size} {...rest} variant="headline" />;
};

export default memo(CardHeadline);
