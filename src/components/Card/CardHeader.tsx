import { FC, memo, ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardHeader: FC<Props> = ({ style, ...rest }, ref: any) => {
    const componentStyles = useComponentStyles('Card_Header', style);

    return <View style={componentStyles} {...rest} ref={ref} />;
};

CardHeader.displayName = 'Card.Header';

export default memo(CardHeader);
