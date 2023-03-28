import { forwardRef, memo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { Animated } from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ViewProps;

const StateLayer = ({ style, ...rest }: Props, ref: any) => {
    const componentStyles = useComponentStyles('StateLayer', style);

    return <Animated.View {...rest} style={componentStyles} ref={ref} />;
};

export default memo(forwardRef(StateLayer));
