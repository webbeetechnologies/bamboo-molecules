import type { DataTableProps } from '@bambooapp/bamboo-molecules';
import type { ViewAbilityConfigPair, ViewTokenExtended, ViewabilityCallback } from '../types';

export const addDataToCallbackPairs = (
    props: Partial<
        Omit<Pick<DataTableProps, 'verticalScrollProps'>, 'viewabilityConfigCallbackPairs'> & {
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
