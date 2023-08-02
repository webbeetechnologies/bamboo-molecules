import type { GroupMeta, GroupMetaStates } from './row';

type GroupStates = GroupMetaStates & {
    isCollapsed: boolean;
};

export type UseShowGroupFooter = (meta: GroupMeta) => boolean;
export type UseGroupRowState = (meta: GroupMetaStates) => Partial<GroupStates>;

export { UseRowRenderer } from '@bambooapp/bamboo-molecules';
