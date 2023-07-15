import { TabBase, TabsProps } from './Tabs';
import { default as TabItem, TabItemProps } from './TabItem';

export const Tabs = Object.assign(TabBase, {
    Item: TabItem,
});

export type { TabsProps, TabItemProps };
export { tabsStyles, tabsItemStyles } from './utils';
