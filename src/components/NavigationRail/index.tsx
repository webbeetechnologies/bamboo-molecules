import NavigationRailComponent from './NavigationRail';
import NavigationRailHeader from './NavigationRailHeader';
import NavigationRailContent from './NavigationRailContent';
import NavigationRailFooter from './NavigationRailFooter';
import NavigationRailItem from './NavigationRailItem';

export const NavigationRail = Object.assign(NavigationRailComponent, {
    Item: NavigationRailItem,
    Header: NavigationRailHeader,
    Content: NavigationRailContent,
    Footer: NavigationRailFooter,
});

export { Props as NavigationRailProps } from './NavigationRail';
export { Props as NavigationRailHeaderProps } from './NavigationRailHeader';
export { Props as NavigationRailContentProps } from './NavigationRailContent';
export { Props as NavigationRailFooterProps } from './NavigationRailFooter';
export { Props as NavigationRailItemProps } from './NavigationRailItem';
export {
    navigationRailStyles,
    navigationRailHeaderStyles,
    navigationRailContentStyles,
    navigationRailFooterStyles,
    navigationRailItemStyles,
} from './utils';
