import { FC, memo, ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardHeader: FC<Props> = ({ style, ...rest }, ref: any) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Card_Header', style);

    return <View style={componentStyles} {...rest} ref={ref} />;
};

CardHeader.displayName = 'Card_Header';

export default memo(CardHeader);
