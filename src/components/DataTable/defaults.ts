import { keyExtractor, getItemLayout } from './utils';
import type { FlatListProps } from 'react-native';

export const defaultProps: Partial<FlatListProps<any>> = {
    windowSize: 11,
    getItemLayout,
    keyExtractor,
};
