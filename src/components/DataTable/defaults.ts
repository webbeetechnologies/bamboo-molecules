import { keyExtractor } from './utils';
import type { FlatListProps } from 'react-native';

export const defaultProps: Partial<FlatListProps<any>> = {
    windowSize: 5,
    maxToRenderPerBatch: 10,
    snapToInterval: 3,
    keyExtractor,
};
