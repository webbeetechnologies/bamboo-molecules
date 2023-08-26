import type { FlatListProps } from '@bambooapp/bamboo-molecules';
import type { RefObject } from 'react';
import type { ViewAbilityConfigPair, ViewTokenExtended, ViewabilityCallback } from '../types';
import type { GroupedData } from './prepareGroupedData';

export const addDataToCallbackPairs = (
    data: RefObject<{ records: GroupedData[] }>,
    props: Partial<
        Omit<FlatListProps<any>, 'viewabilityConfigCallbackPairs'> & {
            viewabilityConfigCallbackPairs: ViewAbilityConfigPair[];
        }
    >,
) => {
    const { viewabilityConfigCallbackPairs, ...rest } = props;

    const getOnViewableItemsChanged: (
        callback: ViewabilityCallback<ViewTokenExtended>,
    ) => ViewabilityCallback =
        callback =>
        ({ viewableItems, changed }) => {
            callback!({
                viewableItems: viewableItems,
                changed: changed,
                viewableRecords: viewableItems.map(({ index }) => data.current!.records[index!]),
                changedRecords: changed.map(({ index }) => data.current!.records[index!]),
            });
        };

    return {
        ...rest,
        viewabilityConfigCallbackPairs: viewabilityConfigCallbackPairs?.map(
            ({ viewabilityConfig, onViewableItemsChanged }) => {
                return {
                    viewabilityConfig,
                    onViewableItemsChanged:
                        onViewableItemsChanged && getOnViewableItemsChanged(onViewableItemsChanged),
                };
            },
        ),
    };
};
