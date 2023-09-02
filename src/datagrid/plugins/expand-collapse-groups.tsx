import { useCallback } from 'react';
import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';
import { usePluginsDataValueSelectorValue, usePluginsDataStoreRef } from './plugins-manager';
import { shallowCompare } from '../../utils';

export const EXPAND_COLLAPSE_GROUPS_KEY = 'expand-collapse-groups';

type ExpandCollapseStore = Record<string, string>;

const getCollapsedGroups = (store: any): ExpandCollapseStore => store?.collapsedGroups ?? {};

const useIsGroupCollapsed = (groupId: string) => {
    return usePluginsDataValueSelectorValue(store => {
        return Object.values(getCollapsedGroups(store[EXPAND_COLLAPSE_GROUPS_KEY])).some(value =>
            groupId.startsWith(value),
        );
    });
};

const useCollapsedGroupIds = () => {
    return usePluginsDataValueSelectorValue(store => {
        return Object.keys(getCollapsedGroups(store[EXPAND_COLLAPSE_GROUPS_KEY]));
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
                        ...getCollapsedGroups(prev[EXPAND_COLLAPSE_GROUPS_KEY]),
                    },
                };
                const isGroupCollapsed = !!getCollapsedGroups(expandCollapseData)[groupId];

                if (isGroupCollapsed) {
                    const shouldContinue = beforeGroupExpand({
                        groupId,
                        collapsedGroupIds: getCollapsedGroups(expandCollapseData),
                    });

                    if (shouldContinue === false) return {};

                    onGroupExpand({ collapsedGroupIds: getCollapsedGroups(expandCollapseData) });

                    delete getCollapsedGroups(expandCollapseData)[groupId];

                    afterGroupExpand();
                } else {
                    const shouldContinue = beforeGroupCollapse({
                        groupId,
                        collapsedGroupIds: getCollapsedGroups(expandCollapseData),
                    });

                    if (shouldContinue === false) return {};

                    onGroupCollapse({ collapsedGroupIds: getCollapsedGroups(expandCollapseData) });

                    getCollapsedGroups(expandCollapseData)[groupId] = groupId;

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
