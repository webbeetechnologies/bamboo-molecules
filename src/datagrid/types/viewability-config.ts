import type { ViewToken, ViewabilityConfig } from 'react-native';

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
