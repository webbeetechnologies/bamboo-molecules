import { useCallback } from 'react';
import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';
import { usePluginsDataValueSelectorValue, usePluginsDataStoreRef } from './plugins-manager';
import { shallowCompare } from '../../utils';

export const EXPAND_COLLAPSE_GROUPS_KEY = 'expand-collapse-groups';

const useIsGroupCollapsed = (groupId: string) => {
    return usePluginsDataValueSelectorValue(store => {
        return !!store[EXPAND_COLLAPSE_GROUPS_KEY]?.collapsedGroups?.[groupId];
    });
};

const useCollapsedGroupIds = () => {
    return usePluginsDataValueSelectorValue(store => {
        return Object.keys(store[EXPAND_COLLAPSE_GROUPS_KEY]?.collapsedGroups || {});
    }, shallowCompare);
};

const useOnToggleGroupExpandAndCollapse = () => {
    const { set: setPluginsStore } = usePluginsDataStoreRef();
    const {
        beforeGroupCollapse,
        onGroupCollapse,
        afterGroupCollapse,
        beforeGroupExpand,
        onGroupExpand,
        afterGroupExpand,
    } = useExpandCollapseGroupsEvents();

    return useCallback(
        (groupId: string) => {
            setPluginsStore(prev => {
                const expandCollapseData = {
                    ...prev[EXPAND_COLLAPSE_GROUPS_KEY],
                    collapsedGroups: {
                        ...prev[EXPAND_COLLAPSE_GROUPS_KEY]?.collapsedGroups,
                    },
                };
                const isGroupCollapsed = !!expandCollapseData.collapsedGroups[groupId];

                if (isGroupCollapsed) {
                    const shouldContinue = beforeGroupExpand({
                        groupId,
                        collapsedGroupIds: expandCollapseData.collapsedGroups,
                    });

                    if (shouldContinue === false) return {};

                    onGroupExpand({ collapsedGroupIds: expandCollapseData.collapsedGroups });

                    delete expandCollapseData.collapsedGroups[groupId];

                    afterGroupExpand();
                } else {
                    const shouldContinue = beforeGroupCollapse({
                        groupId,
                        collapsedGroupIds: expandCollapseData.collapsedGroups,
                    });

                    if (shouldContinue === false) return {};

                    onGroupCollapse({ collapsedGroupIds: expandCollapseData.collapsedGroups });

                    expandCollapseData.collapsedGroups[groupId] = groupId;

                    afterGroupCollapse();
                }

                return {
                    [EXPAND_COLLAPSE_GROUPS_KEY]: expandCollapseData,
                };
            });
        },
        [
            afterGroupCollapse,
            afterGroupExpand,
            beforeGroupCollapse,
            beforeGroupExpand,
            onGroupCollapse,
            onGroupExpand,
            setPluginsStore,
        ],
    );
};

export const [
    useExpandCollapseGroupsPlugin,
    useExpandCollapseGroupsEvents,
    useExpandCollapseGroupsMethods,
] = createPlugin({
    key: EXPAND_COLLAPSE_GROUPS_KEY,
    eventKeys: [
        PluginEvents.BEFORE_GROUP_COLLAPSE,
        PluginEvents.ON_GROUP_COLLAPSE,
        PluginEvents.AFTER_GROUP_COLLAPSE,
        PluginEvents.BEFORE_GROUP_EXPAND,
        PluginEvents.ON_GROUP_EXPAND,
        PluginEvents.AFTER_GROUP_EXPAND,
    ],
    methods: {
        useIsGroupCollapsed,
        useOnToggleGroupExpandAndCollapse,
        useCollapsedGroupIds,
    },
});
