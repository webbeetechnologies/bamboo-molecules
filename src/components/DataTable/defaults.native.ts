import { keyExtractor } from './utils';
import type { FlatListProps } from 'react-native';

export const defaultProps: Partial<FlatListProps<any>> = {
    windowSize: 20,
    keyExtractor,
};
