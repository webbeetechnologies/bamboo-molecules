import { FC, memo, ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardActions: FC<Props> = ({ style, ...rest }, ref: any) => {
    const componentStyles = useComponentStyles('Card_Actions', style);

    return <View style={componentStyles} {...rest} ref={ref} />;
};

CardActions.displayName = 'Card.Actions';

export default memo(CardActions);
