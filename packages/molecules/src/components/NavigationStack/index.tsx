import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import NavigationStackComponent from './NavigationStack';
import NavigationStackItem from './NavigationStackItem';

export const NavigationStackDefault = Object.assign(NavigationStackComponent, {
    Item: NavigationStackItem,
});

registerMoleculesComponents({
    NavigationStack: NavigationStackDefault,
});

export const NavigationStack = getRegisteredComponentWithFallback(
    'NavigationStack',
    NavigationStackDefault,
);

export { Props as NavigationStackProps, NavigationStackHandle } from './NavigationStack';
export { Props as NavigationStackItemProps } from './NavigationStackItem';
export { useNavigation, useRoute, navigationStackItemStyles } from './utils';
