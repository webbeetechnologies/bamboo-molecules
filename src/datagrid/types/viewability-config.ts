import type { ViewToken, ViewabilityConfig } from 'react-native';
import type { LoadMoreRowsArg } from '../../components';
import type { GroupRecord } from '../utils';

export type ViewabilityCallback<ExtendedProps = {}> = (
    info: ExtendedProps & {
        viewableItems: Array<ViewToken>;
        changed: Array<ViewToken>;
    },
) => void;

export type ViewTokenExtended = {
    // viewableRecords: RecordWithId[];
    // changedRecords: RecordWithId[];
};

export type ViewAbilityConfigPair = {
    viewabilityConfig: ViewabilityConfig;
    onViewableItemsChanged: ViewabilityCallback<ViewTokenExtended> | null;
};

export type DataGridLoadMoreRowsArg = LoadMoreRowsArg & {
    visibleGroups: Omit<GroupRecord, 'id'>[];
    overscanGroups: Omit<GroupRecord, 'id'>[];
    pendingRowGroups: Omit<GroupRecord, 'id'>[];
};

export type DataGridLoadMoreRows = (visiblity: DataGridLoadMoreRowsArg) => void;
