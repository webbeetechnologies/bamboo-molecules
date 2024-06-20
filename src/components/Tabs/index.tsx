import { TabBase } from './Tabs';
import type { TabsProps } from './Tabs';

import { default as TabItem } from './TabItem';
import type { TabItemProps } from './TabItem';

import { default as TabLabel } from './TabLabel';
import type { TabLabelProps } from './TabLabel';

export const Tabs = Object.assign(TabBase, {
    Item: TabItem,
    Label: TabLabel,
});

export type { TabsProps, TabItemProps, TabLabelProps };
export { tabsStyles, tabsItemStyles, tabsLabelStyles } from './utils';
