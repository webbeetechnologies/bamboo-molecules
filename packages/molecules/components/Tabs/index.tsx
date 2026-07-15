import { getRegisteredComponentWithFallback } from '../../core';
import type { TabItemProps } from './TabItem';
import { default as TabItem } from './TabItem';
import type { TabLabelProps } from './TabLabel';
import { default as TabLabel } from './TabLabel';
import type { TabsProps } from './Tabs';
import { TabBase } from './Tabs';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Tabs = Object.assign(getRegisteredComponentWithFallback('Tabs', TabBase), {
    Item: TabItem,
    Label: TabLabel,
});

export type { TabItemProps, TabLabelProps, TabsProps };
export { tabsItemStyles, tabsLabelStyles, tabsStyles } from './utils';
