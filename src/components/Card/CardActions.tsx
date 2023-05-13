import { forwardRef, memo, ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardActions = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const { View } = useMolecules();
        const componentStyles = useComponentStyles('Card_Actions', style);

        return <View style={componentStyles} {...rest} ref={ref} />;
    }),
);

CardActions.displayName = 'Card_Actions';

export default CardActions;
