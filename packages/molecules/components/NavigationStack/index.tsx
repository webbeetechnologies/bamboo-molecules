import { getRegisteredComponentWithFallback } from '../../core';
import NavigationStackComponent from './NavigationStack';
import NavigationStackItem from './NavigationStackItem';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const NavigationStack = Object.assign(
    getRegisteredComponentWithFallback('NavigationStack', NavigationStackComponent),
    {
        Item: NavigationStackItem,
    },
);

export type { NavigationStackHandle, Props as NavigationStackProps } from './NavigationStack';
export type { Props as NavigationStackItemProps } from './NavigationStackItem';
export { navigationStackItemStyles, useNavigation, useRoute } from './utils';
