import { createDataSource } from './createDataSource';

import { getDefaultFilterableDataSource } from './FilterableDatasource';
import { getDefaultPageableDataSource } from './PageableDatasource';
import { getDefaultSortableDataSource } from './SortableDatasource';
import { FC, PropsWithChildren } from 'react';
import { FilterableDataSourceProps } from './FilterableDatasource/types';
import { SortableDataSourceProps } from './SortableDatasource/types';
import { PageableDataSourceProps } from './PageableDatasource/types';
import { DataSourceType } from './types';

type ArrayDataSourceProps<T extends {} = Record<string, any>> = FilterableDataSourceProps &
    SortableDataSourceProps &
    PageableDataSourceProps &
    DataSourceType<T>;

let { DataSourceProvider, useDataSourceDispatch, useDataSourceHook } = createDataSource(
    'arrayDataSource',
    [
        getDefaultFilterableDataSource(),
        getDefaultSortableDataSource(),
        getDefaultPageableDataSource(),
    ],
);

export const ArrayDataSourceProvider = DataSourceProvider as unknown as FC<
    PropsWithChildren<ArrayDataSourceProps>
>;
export const useArrayDataSourceDispatch = useDataSourceDispatch;
export const useArrayDataSourceHook = useDataSourceHook as () => ArrayDataSourceProps;
