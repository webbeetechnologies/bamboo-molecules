import { FC, memo, ReactNode } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {
    children: ReactNode | ReactNode[];
};

const CardContent: FC<Props> = ({ style, ...rest }, ref: any) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Card_Content', style);

    return <View style={componentStyles} {...rest} ref={ref} />;
};

CardContent.displayName = 'Card_Content';

export default memo(CardContent);
