import { memo, useContext } from 'react';
import { Text, type TextProps } from 'react-native';

import { ListItemContext } from './ListItem';
import { resolveStateVariant } from '../../utils';
import { listItemTitleStyles } from './utils';

type Props = TextProps & {};

const ListItemTitle = ({ style, ...rest }: Props) => {
    const { disabled, hovered, variant } = useContext(ListItemContext);

    listItemTitleStyles.useVariants({
        state: resolveStateVariant({
            disabled,
            hovered,
        }) as any,
        variant: variant as any,
    });

    return <Text selectable={false} {...rest} style={[listItemTitleStyles.root, style]} />;
};

export default memo(ListItemTitle);
