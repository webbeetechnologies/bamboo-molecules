import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { cleanup, renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createDataSource } from '../createDataSource';
import { getDefaultSortableDataSource, useSortableDataSource } from './index';
import { DataSourceType } from '../types';
import { RecordType } from '../../types';

import { SortableDataSourceProps, SortableDataSourceResult } from './types';
import { useDataSource } from '../DataSourceContext';

type DataSourceProviderProps = Partial<SortableDataSourceProps> &
    Partial<DataSourceType<RecordType>>;

const getDataSourceProvider = (ds: any) =>
    createDataSource('Sortable DataSource Test', [ds]).DataSourceProvider as unknown as FC<
        PropsWithChildren<DataSourceProviderProps>
    >;

const { reducer, ...dataSourceObject } = getDefaultSortableDataSource();

const DataSourceProviderWithoutReducer = getDataSourceProvider(dataSourceObject);
const DataSourceContextProvider = getDataSourceProvider({ reducer, ...dataSourceObject });

const createWrapper = (
    props: DataSourceProviderProps,
    Wrapper: typeof DataSourceProviderWithoutReducer = DataSourceProviderWithoutReducer,
): FC<PropsWithChildren> => {
    return ({ children }) => {
        return (
            <Wrapper isSortable={false} records={[]} sort={{ order: [] as any[] }} {...props}>
                {children}
            </Wrapper>
        );
    };
};

const useDataSourceHookWithFunc = (
    callback: (arg: SortableDataSourceResult) => void,
): SortableDataSourceResult => {
    const dataSource = useSortableDataSource();
    const dsRef = useRef(dataSource);
    const callbackRef = useRef(callback).current;

    useEffect(() => {
        callbackRef(dsRef.current);
    }, [callbackRef]);

    return dataSource;
};

const runTests = (key: string, Wrapper: typeof DataSourceContextProvider) => {
    describe(`${key} Sortable Data Source`, () => {
        afterEach(cleanup);

        test('is not sortable', async () => {
            const { result } = await act(() => {
                return renderHook(() => useSortableDataSource(), {
                    wrapper: createWrapper({}, Wrapper),
                });
            });

            expect(result.current.isSortable).toBe(false);
        });

        test('is sortable', async () => {
            const wrapper = createWrapper({ isSortable: true }, Wrapper);

            const { result: sortableDataSource } = await act(() => {
                return renderHook(() => useSortableDataSource(), {
                    wrapper,
                });
            });

            const { result: dataSource } = await act(() => {
                return renderHook(() => useDataSource(), {
                    wrapper,
                });
            });

            const { isSortable, sort, applySort, removeSort, reorderSort, updateSort } =
                sortableDataSource.current;

            expect(isSortable).toBe(true);
            expect(sort).toHaveProperty('isNestedSort');
            expect(sort.isNestedSort).toBe(false);
            expect(sort).toHaveProperty('order');
            expect(sort.order).toBeInstanceOf(Array);
            expect(sort.order).toHaveLength(0);
            expect(applySort).toBeInstanceOf(Function);
            expect(removeSort).toBeInstanceOf(Function);
            expect(reorderSort).toBeInstanceOf(Function);
            expect(updateSort).toBeInstanceOf(Function);

            const { records } = dataSource.current;
            expect(records).toBeInstanceOf(Array);
            expect(records).toHaveLength(0);
        });

        test('order is defined', async () => {
            const wrapper = createWrapper(
                {
                    isSortable: true,
                    sort: {
                        order: [{ column: 'name', direction: 1 }],
                    },
                },
                Wrapper,
            );

            const { result: sortableDataSource } = await act(() => {
                return renderHook(() => useSortableDataSource(), {
                    wrapper,
                });
            });

            const { isSortable, sort } = sortableDataSource.current;

            expect(isSortable).toBe(true);
            expect(sort).toHaveProperty('order');
            expect(sort.order).toBeInstanceOf(Array);
            expect(sort.order).toHaveLength(1);

            const item = sort.order[0];

            expect(item).toHaveProperty('column');
            expect(item.column).toBe('name');
            expect(item).toHaveProperty('direction');
            expect(item.direction).toBe(1);
        });

        test('order is to update', async () => {
            const wrapper = createWrapper(
                {
                    isSortable: true,
                    sort: {
                        order: [{ column: 'name', direction: 1 }],
                    },
                },
                Wrapper,
            );

            const { result: sortResult } = await act(() => {
                return renderHook(
                    () => {
                        const { sort } = useDataSourceHookWithFunc(({ applySort }) => {
                            applySort({ column: 'age' });
                        });
                        return sort;
                    },
                    {
                        wrapper,
                    },
                );
            });

            expect(sortResult.current.order).toHaveLength(1);

            const item = sortResult.current.order[0];

            expect(item).toHaveProperty('column');
            expect(item.column).toBe('age');
            expect(item).toHaveProperty('direction');
            expect(item.direction).toBe(0);
        });

        test('order with nested sort', async () => {
            const wrapper = createWrapper(
                {
                    isSortable: true,
                    sort: {
                        isNestedSort: true,
                        order: [{ column: 'name', direction: 1 }],
                    },
                },
                Wrapper,
            );

            const { result: sortableDataSource } = await act(() => {
                return renderHook(
                    () => {
                        const dataSource = useDataSourceHookWithFunc(({ applySort }) => {
                            applySort({ column: 'age' });
                            applySort({ column: 'id', direction: 1 });
                        });
                        return dataSource;
                    },
                    {
                        wrapper,
                    },
                );
            });
            const { sort } = sortableDataSource.current;
            expect(sort).toHaveProperty('isNestedSort');
            expect(sort.isNestedSort).toBe(true);
            expect(sort.order).toHaveLength(3);

            const [, item2, item3] = sort.order;

            expect(item2.column).toBe('age');
            expect(item2.direction).toBe(0);

            expect(item3.column).toBe('id');
            expect(item3.direction).toBe(1);
        });

        test('order with removing sort', async () => {
            const wrapper = createWrapper(
                {
                    isSortable: true,
                    sort: {
                        isNestedSort: true,
                        order: [{ column: 'name', direction: 1 }],
                    },
                },
                Wrapper,
            );

            const { result: sortableDataSource } = await act(() => {
                return renderHook(
                    () => {
                        return useDataSourceHookWithFunc(({ removeSort }) => {
                            removeSort({ column: 'name' });
                        });
                    },
                    {
                        wrapper,
                    },
                );
            });
            const { sort } = sortableDataSource.current;
            expect(sort).toHaveProperty('isNestedSort');
            expect(sort.isNestedSort).toBe(true);
            expect(sort.order).toHaveLength(0);
        });

        test('order with updating sort', async () => {
            const wrapper = createWrapper(
                {
                    isSortable: true,
                    sort: {
                        isNestedSort: true,
                        order: [{ column: 'name', direction: 1 }],
                    },
                },
                Wrapper,
            );

            const { result: sortableDataSource } = await act(() => {
                return renderHook(
                    () => {
                        return useDataSourceHookWithFunc(({ updateSort }) => {
                            updateSort({ column: 'name', direction: 0, index: 0 });
                        });
                    },
                    {
                        wrapper,
                    },
                );
            });

            const { sort } = sortableDataSource.current;
            expect(sort).toHaveProperty('isNestedSort');
            expect(sort.isNestedSort).toBe(true);
            expect(sort.order).toHaveLength(1);

            const item = sort.order[0];

            expect(item).toHaveProperty('column');
            expect(item.column).toBe('name');
            expect(item).toHaveProperty('direction');
            expect(item.direction).toBe(0);
        });

        test('order with reordering sort', async () => {
            const wrapper = createWrapper(
                {
                    isSortable: true,
                    sort: {
                        isNestedSort: true,
                        order: [
                            { column: 'name', direction: 1 },
                            { column: 'age', direction: 0 },
                        ],
                    },
                },
                Wrapper,
            );

            const { result: sortableDataSource } = await act(() => {
                return renderHook(
                    () => {
                        return useDataSourceHookWithFunc(({ reorderSort }) => {
                            reorderSort({ prevIndex: 0, newIndex: 1 });
                        });
                    },
                    {
                        wrapper,
                    },
                );
            });

            const { sort } = sortableDataSource.current;

            expect(sort).toHaveProperty('isNestedSort');
            expect(sort.isNestedSort).toBe(true);
            expect(sort.order).toHaveLength(2);

            const [item1, item2] = sort.order;

            expect(item2.column).toBe('name');
            expect(item2.direction).toBe(1);

            expect(item1.column).toBe('age');
            expect(item1.direction).toBe(0);
        });
    });
};

describe('nested', () => {
    runTests('DataSourceContextProvider', DataSourceContextProvider);
    runTests('DataSourceProviderWithoutReducer', (props => {
        return <DataSourceProviderWithoutReducer {...props} onSort={reducer} />;
    }) as typeof DataSourceProviderWithoutReducer);
});
