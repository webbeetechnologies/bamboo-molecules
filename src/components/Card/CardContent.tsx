import { FC, memo, ReactNode } from 'react';
import { View } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles } from '../../hooks';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardContent: FC<Props> = ({ style, ...rest }, ref: any) => {
    const componentStyles = useComponentStyles('Card_Content', style);

    return <View style={componentStyles} {...rest} ref={ref} />;
};

CardContent.displayName = 'Card.Content';

export default memo(CardContent);
