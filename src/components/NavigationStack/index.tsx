import NavigationStackComponent from './NavigationStack';
import NavigationStackItem from './NavigationStackItem';

export const NavigationStack = Object.assign(NavigationStackComponent, {
    Item: NavigationStackItem,
});

export { Props as NavigationStackProps, NavigationStackHandle } from './NavigationStack';
export { Props as NavigationStackItemProps } from './NavigationStackItem';
export { useNavigation, useRoute, navigationStackItemStyles } from './utils';
