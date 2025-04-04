import { forwardRef, memo, ReactNode, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';
import { cardActionsStyles } from './utils';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardActions = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const componentStyles = useMemo(() => [cardActionsStyles.root, style], [style]);

        return <View style={componentStyles} {...rest} ref={ref} />;
    }),
);

CardActions.displayName = 'Card_Actions';

export default CardActions;
