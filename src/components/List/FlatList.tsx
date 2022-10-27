import { memo, useMemo, forwardRef } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useComponentStyles, useMolecules } from '../../hooks';
// import type { WithElements } from '../../types';
// import { useMolecules, useComponentStyles } from '../../hooks';
// import type { TouchableRippleProps } from '../TouchableRipple';
// import { CallbackActionState, withActionState } from '../../hocs';

// type ItemT = ReactNode;

export type Props = FlashListProps<{}> & {
    /**
     * Style that is passed to Container element.
     */
    style?: StyleProp<TextStyle>;
    /**
     * Style that is passed to Container element.
     */
    containerStyle?: StyleProp<ViewStyle>;

    // renderItem: ({ item, index, target, extraData }: any) => void;

    // data: ItemT[];
};

const FlatList = (
    { style: styleProp, containerStyle, data, renderItem, ...props }: Props,
    ref: any,
) => {
    const { Surface } = useMolecules();
    const componentStyles = useComponentStyles('FlatList', styleProp);

    const { containerStyles, style } = useMemo(() => {
        const { ..._style } = componentStyles;
        return {
            containerStyles: [containerStyle],
            style: _style,
        };
    }, [componentStyles, containerStyle]);

    const flashList = useMemo(() => {
        const flashListProps = { ...props, data, renderItem, style };

        return <FlashList {...flashListProps} />;
    }, [props, data, renderItem, style]);

    return (
        <Surface style={containerStyles} ref={ref} elevation={0}>
            {flashList}
        </Surface>
    );
};

export default memo(forwardRef(FlatList));
