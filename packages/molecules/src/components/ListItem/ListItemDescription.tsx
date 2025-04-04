import { memo, useContext } from 'react';
import { Text, type TextProps } from 'react-native';
import { ListItemContext } from './ListItem';
import { resolveStateVariant } from '../../utils';
import { listItemDescriptionStyles } from './utils';

type Props = TextProps & {};

const ListItemDescription = ({ style, ...rest }: Props) => {
    const { disabled, hovered, variant } = useContext(ListItemContext);

    listItemDescriptionStyles.useVariants({
        state: resolveStateVariant({
            disabled,
            hovered,
        }) as any,
        variant: variant as any,
    });

    return <Text selectable={false} {...rest} style={[listItemDescriptionStyles.root, style]} />;
};

export default memo(ListItemDescription);
