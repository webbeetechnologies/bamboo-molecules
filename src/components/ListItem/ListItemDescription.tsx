import { memo, useContext } from 'react';
import type { TextProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';
import { ListItemContext } from './ListItem';

type Props = TextProps & {};

const ListItemDescription = ({ style, ...rest }: Props) => {
    const { Text } = useMolecules();
    const { disabled, hovered } = useContext(ListItemContext);
    const componentStyles = useComponentStyles('ListItemDescription', style, {
        states: {
            disabled,
            hovered,
        },
    });

    return <Text {...rest} style={componentStyles} />;
};

export default memo(ListItemDescription);
