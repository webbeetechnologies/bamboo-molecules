import { forwardRef, memo, ReactNode, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';
import { cardContentStyles } from './utils';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardContent = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const componentStyles = useMemo(() => [cardContentStyles.root, style], [style]);

        return <View style={componentStyles} {...rest} ref={ref} />;
    }),
);

CardContent.displayName = 'Card_Content';

export default CardContent;
