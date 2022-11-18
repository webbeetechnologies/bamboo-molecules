import { memo } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

enum InputAddonVariants {
    Left = 'left',
    Right = 'right',
}

export type Props = ViewProps & {
    variant: `${InputAddonVariants}`;
};

const InputAddon = ({ variant, style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('InputAddon', style, {
        variant,
    }); // all the styling logics goes here

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
};

export default memo(InputAddon);
