import type { GroupMeta, GroupMetaStates } from '../utils';

type GroupStates = GroupMetaStates & {
    isCollapsed: boolean;
};

export type UseShowGroupFooter = (meta: GroupMeta) => boolean;
export type UseGroupRowState = (meta: GroupMeta) => Partial<Omit<GroupStates, 'rowType'>>;

export { UseRowRenderer } from '@bambooapp/bamboo-molecules';
