import { memo, useContext } from 'react';
import type { TextProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';
import { ListItemContext } from './ListItem';

type Props = TextProps & {};

const ListItemTitle = ({ style, ...rest }: Props) => {
    const { Text } = useMolecules();
    const { disabled, hovered, variant } = useContext(ListItemContext);
    const componentStyles = useComponentStyles('ListItemTitle', style, {
        states: {
            disabled,
            hovered,
        },
        variant,
    });

    return <Text selectable={false} {...rest} style={componentStyles} />;
};

export default memo(ListItemTitle);
