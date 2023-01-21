import { FC, PropsWithChildren } from 'react';
import { cleanup, renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createDataSource } from '../../createDataSource';
import { getDefaultFilterableDataSource, useFilterableDataSource } from '../index';
import { DataSourceType } from '../../types';

import { FilterableDataSourceProps, FilterableDataSourceResult, SingleFilter } from '../types';

import {
    createTestWrapper,
    CreateTestWrapper,
} from '../../../../testUtils/utils/createTestWrapper';
import { createDataSourceHookWithFunc } from '../../../../testUtils/utils/useDataSourceHookWithFunc';
import { getMockData } from '../../../../__mocks__/src/mockData';
import { RecordType } from '../../../types';
import { presentRecordsWithFilters } from '../presenter';

const createWrapper: CreateTestWrapper<DataSourceProviderProps> = createTestWrapper;

const useDataSourceHookWithFunc = createDataSourceHookWithFunc(() =>
    useFilterableDataSource<RecordType>(),
);

type DataSourceProviderProps = Partial<FilterableDataSourceProps> &
    Partial<DataSourceType<RecordType>>;

const { reducer, ...dataSourceObject } = getDefaultFilterableDataSource();

const DataSourceProviderWithoutReducer = createDataSource('Filterable DataSource Test', [
    dataSourceObject,
]).DataSourceProvider as FC<PropsWithChildren<DataSourceProviderProps>>;

const DataSourceContextProvider = createDataSource('Filterable DataSource without reducer', [
    {
        reducer,
        ...dataSourceObject,
    },
]).DataSourceProvider as FC<PropsWithChildren<DataSourceProviderProps>>;

const runTests = (key: string, Wrapper: typeof DataSourceContextProvider) => {
    describe(`${key} Filterable Data Source`, () => {
        afterEach(cleanup);

        /**
         *
         * Is not a filterable datasource
         *
         */
        test('is not pageable', async () => {
            const { result } = await act(() => {
                return renderHook(() => useFilterableDataSource(), {
                    wrapper: createWrapper(Wrapper, {}),
                });
            });

            expect(result.current.isFilterable).toBe(false);
        });

        /**
         *
         * Is not a filterable datasource
         *
         */
        test('is filterable', async () => {
            const wrapper = createWrapper(Wrapper, { isFilterable: true });

            const { result: filteredDataSource } = await act(() => {
                return renderHook(() => useFilterableDataSource(), {
                    wrapper,
                });
            });

            const {
                isFilterable,
                applyFilter,
                removeFilter,
                updateFilter,
                moveFilter,
                addFilterGroup,
                updateFilterGroup,
                records,
            } = filteredDataSource.current;

            expect(isFilterable).toBe(true);

            expect(applyFilter).toBeInstanceOf(Function);
            expect(removeFilter).toBeInstanceOf(Function);
            expect(updateFilter).toBeInstanceOf(Function);
            expect(moveFilter).toBeInstanceOf(Function);
            expect(addFilterGroup).toBeInstanceOf(Function);
            expect(updateFilterGroup).toBeInstanceOf(Function);

            expect(records).toBeInstanceOf(Array);
            expect(records).toHaveLength(0);
        });

        /**
         *
         * Is filterable datasource with records
         *
         */
        test('is filterable with records', async () => {
            const mockData = getMockData();
            const wrapper = createWrapper(Wrapper, { isFilterable: true, records: mockData });

            const { result: filteredDataSource } = await act(() => {
                return renderHook(() => useFilterableDataSource(), {
                    wrapper,
                });
            });

            const { isFilterable, filters, records } = filteredDataSource.current;

            expect(isFilterable).toBe(true);

            expect(filters).toBeInstanceOf(Array);
            expect(filters).toHaveLength(0);

            expect(records).toBeInstanceOf(Array);
            expect(records).toHaveLength(40);
        });

        /**
         *
         * start with filters
         *
         */
        test('start with filters', async () => {
            const mockData = getMockData();
            const wrapper = createWrapper(Wrapper, {
                isFilterable: true,
                records: mockData,
                filters: [
                    {
                        columnName: 'id',
                        value: '10',
                    },
                ],
            });

            const { result: paginationResult } = await act(() => {
                return renderHook(useFilterableDataSource, {
                    wrapper,
                });
            });

            const { filters, records } = paginationResult.current;

            expect(filters).toHaveLength(1);
            expect(records).toHaveLength(
                presentRecordsWithFilters({ filters, records: mockData }).totalRecordsCount,
            );
        });

        /**
         *
         * should update
         *
         */
        test('updates the filters', async () => {
            const mockData = getMockData();
            const wrapper = createWrapper(Wrapper, {
                isFilterable: true,
                records: mockData,
                filters: [
                    {
                        columnName: 'id',
                        value: '10',
                    },
                ],
            });

            const { result: paginationResult } = await act(() => {
                return renderHook(
                    () => {
                        return useDataSourceHookWithFunc(({ applyFilter }) => {
                            applyFilter({ columnName: 'first_name', value: 'Green' });
                            applyFilter({ columnName: 'last_name', value: 'Kohler' });
                        });
                    },
                    {
                        wrapper,
                    },
                );
            });

            const { filters, records } = paginationResult.current;

            expect(filters).toHaveLength(3);

            const [id, firstName, lastName] = filters as SingleFilter[];

            expect(id).toHaveProperty('columnName', 'id');
            expect(id).toHaveProperty('value', '10');

            expect(firstName).toHaveProperty('columnName', 'first_name');
            expect(firstName).toHaveProperty('value', 'Green');

            expect(lastName).toHaveProperty('columnName', 'last_name');
            expect(lastName).toHaveProperty('value', 'Kohler');

            expect(records).toHaveLength(
                presentRecordsWithFilters({ filters, records: mockData }).totalRecordsCount,
            );
        });

        /**
         *
         * Filter Actions
         *
         */
        type RunFilterFunc = (prop: FilterableDataSourceResult & { records: RecordType[] }) => void;
        const runFilterActions = (
            name: string,
            mockData: RecordType[],
            runHook: RunFilterFunc,
            runAssertions: RunFilterFunc,
            initialState: Partial<DataSourceProviderProps> = {},
        ) =>
            test(name, async () => {
                const wrapper = createWrapper(Wrapper, {
                    isFilterable: true,
                    records: mockData,
                    ...initialState,
                });

                const { result: pageableDatasource } = await act(() => {
                    return renderHook(
                        () => {
                            return useDataSourceHookWithFunc(runHook);
                        },
                        {
                            wrapper,
                        },
                    );
                });

                runAssertions(pageableDatasource.current);
            });

        /**
         *
         * remove filters
         *
         */
        describe('remove filters', () => {
            const mockData = getMockData();
            const initialState = {
                filters: [
                    {
                        columnName: 'id',
                        value: '10',
                    },
                    {
                        columnName: 'first_name',
                        value: 'Green',
                    },
                    {
                        columnName: 'last_name',
                        value: 'Kohler',
                    },
                ],
            };

            runFilterActions(
                `should remove filters`,
                mockData,
                ({ removeFilter }: FilterableDataSourceResult) => {
                    removeFilter({ position: 0 });
                    removeFilter({ position: 0 });
                },
                pageableDatasource => {
                    const { records } = pageableDatasource;
                    let { filters } = pageableDatasource;

                    filters = filters as SingleFilter[];
                    expect(filters).toHaveLength(1);

                    expect(filters[0]).toHaveProperty('columnName', 'last_name');
                    expect(filters[0]).toHaveProperty('value', 'Kohler');

                    expect(records).toHaveLength(
                        presentRecordsWithFilters({ filters, records: mockData }).totalRecordsCount,
                    );
                },
                initialState,
            );
        });

        /**
         *
         * updateFilter Page
         *
         */
        describe('updateFilter ', () => {
            const mockData = getMockData();
            const initialState = {
                filters: [
                    {
                        columnName: 'id',
                        value: '10',
                    },
                    {
                        columnName: 'first_name',
                        value: 'Green',
                    },
                    {
                        columnName: 'last_name',
                        value: 'Kohler',
                    },
                ],
            };

            runFilterActions(
                `updateFilter works`,
                mockData,
                ({ updateFilter }: FilterableDataSourceResult) => {
                    updateFilter({ columnName: 'first_name', value: 'Durgan', position: 2 });
                },
                pageableDatasource => {
                    const { filters, records } = pageableDatasource;

                    expect(filters).toHaveLength(3);
                    const [filter1, filter2, filter3] = filters as SingleFilter[];

                    expect(filter1).toHaveProperty('columnName', 'id');
                    expect(filter1).toHaveProperty('value', '10');

                    expect(filter2).toHaveProperty('columnName', 'first_name');
                    expect(filter2).toHaveProperty('value', 'Green');

                    expect(filter3).toHaveProperty('columnName', 'first_name');
                    expect(filter3).toHaveProperty('value', 'Durgan');

                    expect(records).toHaveLength(0);
                },
                initialState,
            );
        });

        /**
         *
         * moveFilter Page
         *
         */
        describe('moveFilter ', () => {
            const runTest = (name: string, runHook: RunFilterFunc, runAssertions: RunFilterFunc) =>
                runFilterActions(name, [], runHook, runAssertions, {
                    filters: [
                        {
                            columnName: 'id',
                            value: '10',
                        },
                        {
                            columnName: 'first_name',
                            value: 'Green',
                        },
                        {
                            columnName: 'last_name',
                            value: 'Kohler',
                        },
                        {
                            columnName: 'other_prop',
                            value: 'some value',
                        },
                    ],
                });

            runTest(
                `moving items in the middle work`,
                ({ moveFilter }) => {
                    moveFilter({ from: 2, to: 1 });
                },
                pageableDatasource => {
                    const { filters } = pageableDatasource;

                    expect(filters).toHaveLength(4);
                    const [filter1, filter2, filter3, filter4] = filters as SingleFilter[];

                    expect(filter1).toHaveProperty('columnName', 'id');
                    expect(filter1).toHaveProperty('value', '10');

                    expect(filter2).toHaveProperty('columnName', 'last_name');
                    expect(filter2).toHaveProperty('value', 'Kohler');

                    expect(filter3).toHaveProperty('columnName', 'first_name');
                    expect(filter3).toHaveProperty('value', 'Green');

                    expect(filter4).toHaveProperty('columnName', 'other_prop');
                    expect(filter4).toHaveProperty('value', 'some value');
                },
            );

            runTest(
                `moving items to end works`,
                ({ moveFilter }) => {
                    moveFilter({ from: 3, to: 0 });
                },
                pageableDatasource => {
                    const { filters } = pageableDatasource;

                    expect(filters).toHaveLength(4);
                    const [filter1, filter2, filter3, filter4] = filters as SingleFilter[];

                    expect(filter1).toHaveProperty('columnName', 'other_prop');
                    expect(filter1).toHaveProperty('value', 'some value');

                    expect(filter2).toHaveProperty('columnName', 'first_name');
                    expect(filter2).toHaveProperty('value', 'Green');

                    expect(filter3).toHaveProperty('columnName', 'last_name');
                    expect(filter3).toHaveProperty('value', 'Kohler');

                    expect(filter4).toHaveProperty('columnName', 'id');
                    expect(filter4).toHaveProperty('value', '10');
                },
            );
        });
    });
};

describe('All FilterableDataSource Tests', () => {
    runTests('DataSourceContextProvider', DataSourceContextProvider);
    runTests('DataSourceProviderWithoutReducer', (props => {
        return <DataSourceProviderWithoutReducer {...props} onFilter={reducer} />;
    }) as typeof DataSourceProviderWithoutReducer);
});
