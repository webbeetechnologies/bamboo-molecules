import { forwardRef, memo, ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardHeader = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const { View } = useMolecules();
        const componentStyles = useComponentStyles('Card_Header', style);

        return <View style={componentStyles} {...rest} ref={ref} />;
    }),
);

CardHeader.displayName = 'Card_Header';

export default CardHeader;
