import { forwardRef, memo } from 'react';
import { Animated, type ViewProps } from 'react-native';
import { stateLayerStyles } from './utils';

export type Props = ViewProps;

const StateLayer = ({ style, ...rest }: Props, ref: any) => {
    return <Animated.View {...rest} style={[stateLayerStyles.root, style]} ref={ref} />;
};

export default memo(forwardRef(StateLayer));
