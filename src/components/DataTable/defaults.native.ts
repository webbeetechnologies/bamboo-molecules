import { keyExtractor } from './utils';
import type { FlatListProps } from 'react-native';

export const defaultProps: Partial<FlatListProps<any>> = {
    windowSize: 10,
    maxToRenderPerBatch: 30,
    keyExtractor,
};
