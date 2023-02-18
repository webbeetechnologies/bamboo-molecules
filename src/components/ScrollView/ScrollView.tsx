import { ForwardedRef, forwardRef, memo, RefAttributes } from 'react';
import type { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useComponentStyles } from '../../hooks';

export type ScrollViewRef = ScrollView;

export type Props = ScrollViewProps & RefAttributes<ScrollViewRef> & {};

const ComponentTemplate = ({ style, ...rest }: Props, ref: ForwardedRef<ScrollViewRef>) => {
    const componentStyles = useComponentStyles('ScrollView', style);

    return <ScrollView ref={ref} style={componentStyles} {...rest} />;
};

export default memo(forwardRef(ComponentTemplate));
