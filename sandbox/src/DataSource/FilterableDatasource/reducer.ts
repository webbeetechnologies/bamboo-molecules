import {
    EFilterActions,
    EFilterOperators,
    FilterReducer,
    GroupedFilter,
    OnFilterAction,
    SingleFilter,
} from './types';
import { move } from './utils';
import { getOrFail, modify } from '../../utils/objects';

const nestedFiltersReducer: FilterReducer = (dataSource, action) => {
    let filters = dataSource.filters;

    const position = action.payload.position as string;
    const path = position.split('.');
    const atIndex = Number(path.pop());
    const time = Date.now();

    switch (action.type) {
        case EFilterActions.ADD_GROUP:
            filters = modify(filters, position, (currentGroup: GroupedFilter) => {
                const currentType = currentGroup.type;
                return {
                    ...currentGroup,
                    filters: currentGroup.filters.concat({
                        type:
                            currentType === EFilterOperators.OR
                                ? EFilterOperators.AND
                                : EFilterOperators.OR,
                        filters: [],
                    }),
                };
            });
            break;
        case EFilterActions.UPDATE_GROUP:
            filters = modify(filters, position, (currentGroup: GroupedFilter) => ({
                ...currentGroup,
                type: action.payload.type,
                createdAt: time,
                updatedAt: time,
            }));
            break;
        case EFilterActions.REMOVE_FILTER:
            filters = modify(filters, path.join('.'), (currentGroup: GroupedFilter) => {
                return {
                    ...currentGroup,
                    filters: currentGroup.filters.filter((_x, i) => i !== atIndex),
                };
            });
            break;
        case EFilterActions.APPLY_FILTER:
            filters = modify(filters, position, (currentFilter: GroupedFilter) => ({
                ...currentFilter,
                columnName: action.payload.columnName,
                value: action.payload.value,
                updatedAt: time,
            }));
            break;
        case EFilterActions.UPDATE_FILTER:
            filters = modify(filters, position, (currentFilter: GroupedFilter) => ({
                ...currentFilter,
                columnName: action.payload.columnName,
                value: action.payload.value,
                updatedAt: time,
            }));
            break;
        case EFilterActions.MOVE_FILTER: {
            const from = action.payload.from as string;
            const to = action.payload.to as string;

            const fromPath = from.split('.');
            const fromIndex = Number(fromPath.pop());
            const fromPathString = fromPath.join('.');

            const toPath = to.split('.');
            const toIndex = Number(toPath.pop());
            const toPathString = toPath.join('.');

            const fromArray = getOrFail(filters, fromPathString);
            const toArray = getOrFail(filters, toPathString);
            const isSameObject = fromArray === toArray;
            const { fromArray: fResult, toArray: tResult } = move({
                fromArray,
                toArray: isSameObject ? undefined : fromArray,
                from: fromIndex,
                to: toIndex,
            });
            filters = modify(filters, fromPathString, fResult);
            filters = modify(filters, toPathString, tResult ?? fResult);
            break;
        }
        default:
            return dataSource;
    }

    return {
        ...dataSource,
        filters,
    };
};

export const filterableDatasourceReducer: FilterReducer = (dataSource, action: OnFilterAction) => {
    if (dataSource.filterConfig?.hasNestedFilter) {
        return nestedFiltersReducer(dataSource, action);
    }

    const time = Date.now();
    let filters = dataSource.filters as SingleFilter[];
    switch (action.type) {
        case EFilterActions.APPLY_FILTER:
            filters = filters.concat({
                columnName: action.payload.columnName,
                value: action.payload.value,
                createdAt: time,
                updatedAt: time,
            });
            break;
        case EFilterActions.REMOVE_FILTER: {
            const position = action.payload.position as number;
            filters = filters.filter((_x, index) => index !== position);
            break;
        }
        case EFilterActions.UPDATE_FILTER:
            filters = filters.map(filter => {
                if (filter.columnName !== action.payload.columnName) return filter;
                return {
                    ...filter,
                    columnName: action.payload.columnName,
                    value: action.payload.value,
                    updatedAt: time,
                };
            });
            break;
        case EFilterActions.MOVE_FILTER: {
            const from = action.payload.from as number;
            const to = action.payload.to as number;

            const { fromArray } = move({ fromArray: filters as SingleFilter[], from, to });
            filters = fromArray;
            break;
        }
        default:
            return dataSource;
    }

    return {
        ...dataSource,
        filters,
    };
};
