import { forwardRef, memo, ReactNode, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';
import { cardHeaderStyles } from './utils';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardHeader = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const componentStyles = useMemo(() => [cardHeaderStyles.root, style], [style]);

        return <View style={componentStyles} {...rest} ref={ref} />;
    }),
);

CardHeader.displayName = 'Card_Header';

export default CardHeader;
