import { FC, PropsWithChildren } from 'react';
import { cleanup, renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createDataSource } from '../../createDataSource';
import { getDefaultPageableDataSource, usePaginatedDataSource } from '../index';
import { DataSourceType } from '../../types';
import { RecordType } from '../../../types';

import { PageableDataSourceProps, PaginationDataSourceResult } from '../types';

import {
    createTestWrapper,
    CreateTestWrapper,
} from '../../../../testUtils/utils/createTestWrapper';
import { createDataSourceHookWithFunc } from '../../../../testUtils/utils/useDataSourceHookWithFunc';
import { getMockData } from '../../../../__mocks__/src/mockData';

const createWrapper: CreateTestWrapper<DataSourceProviderProps> = createTestWrapper;

const useDataSourceHookWithFunc = createDataSourceHookWithFunc(() =>
    usePaginatedDataSource<RecordType>(),
);

type DataSourceProviderProps = Partial<PageableDataSourceProps> &
    Partial<DataSourceType<RecordType>>;

const { reducer, ...dataSourceObject } = getDefaultPageableDataSource();

const DataSourceProviderWithoutReducer = createDataSource('Pageable DataSource Test', [
    dataSourceObject,
]).DataSourceProvider as FC<PropsWithChildren<DataSourceProviderProps>>;

const DataSourceContextProvider = createDataSource('Pageable DataSource without reducer', [
    {
        reducer,
        ...dataSourceObject,
    },
]).DataSourceProvider as FC<PropsWithChildren<DataSourceProviderProps>>;

const getStartAndEndIndex = ({ pageNumber = 1, pageSize = 10 }) => {
    const startIndex = Math.abs(pageSize - pageSize * pageNumber);
    const endIndex = startIndex + pageSize - 1;

    return [startIndex, endIndex];
};

const runTests = (key: string, Wrapper: typeof DataSourceContextProvider) => {
    describe(`${key} Pageable Data Source`, () => {
        afterEach(cleanup);

        /**
         *
         * Is not a paginated datasource
         *
         */
        test('is not pageable', async () => {
            const { result } = await act(() => {
                return renderHook(() => usePaginatedDataSource(), {
                    wrapper: createWrapper(Wrapper, {}),
                });
            });

            expect(result.current.isPaginated).toBe(false);
        });

        /**
         *
         * Is paginated datasource
         *
         */
        test('is paginated', async () => {
            const wrapper = createWrapper(Wrapper, { isPaginated: true });

            const { result: paginatedDataSource } = await act(() => {
                return renderHook(() => usePaginatedDataSource(), {
                    wrapper,
                });
            });

            const {
                isPaginated,
                pagination,
                setPerPage,
                goTo,
                goToStart,
                goToEnd,
                goToPrev,
                goToNext,
                records,
            } = paginatedDataSource.current;

            expect(isPaginated).toBe(true);
            expect(pagination).toHaveProperty('count');
            expect(pagination?.count).toBe(0);
            expect(pagination).toHaveProperty('totalRecords');
            expect(pagination?.totalRecords).toBe(0);
            expect(pagination).toHaveProperty('pageNumber');
            expect(pagination?.pageNumber).toBe(1);
            expect(pagination).toHaveProperty('perPage');
            expect(pagination?.perPage).toBe(10);

            expect(setPerPage).toBeInstanceOf(Function);
            expect(goTo).toBeInstanceOf(Function);
            expect(goToStart).toBeInstanceOf(Function);
            expect(goToEnd).toBeInstanceOf(Function);
            expect(goToPrev).toBeInstanceOf(Function);
            expect(goToNext).toBeInstanceOf(Function);

            expect(records).toBeInstanceOf(Array);
            expect(records).toHaveLength(0);
        });

        /**
         *
         * Is paginated datasource with records
         *
         */
        test('is paginated with records', async () => {
            const mockData = getMockData();
            const wrapper = createWrapper(Wrapper, { isPaginated: true, records: mockData });

            const { result: paginatedDataSource } = await act(() => {
                return renderHook(() => usePaginatedDataSource(), {
                    wrapper,
                });
            });

            const { isPaginated, pagination, records } = paginatedDataSource.current;

            expect(isPaginated).toBe(true);

            expect(pagination).toHaveProperty('perPage');
            expect(pagination?.perPage).toBe(10);

            expect(pagination).toHaveProperty('count');
            expect(pagination?.count).toBe(pagination?.perPage);

            expect(pagination).toHaveProperty('totalRecords');
            expect(pagination?.totalRecords).toBe(mockData.length);

            expect(pagination).toHaveProperty('pageNumber');
            expect(pagination?.pageNumber).toBe(1);

            expect(records).toBeInstanceOf(Array);
            expect(records).toHaveLength(pagination.perPage);

            expect(records[0]).toBe(mockData[0]);
            expect(records[9]).toBe(mockData[9]);
        });

        /**
         *
         * should update
         *
         */
        test('updates the records', async () => {
            const mockData = getMockData();

            const wrapper = createWrapper(Wrapper, {
                isPaginated: true,
                records: mockData,
            });

            const { result: paginationResult } = await act(() => {
                return renderHook(
                    () => {
                        return useDataSourceHookWithFunc(({ goTo, setPerPage }) => {
                            setPerPage({ perPage: 3 });
                            goTo({ pageNumber: 3 });
                        });
                    },
                    {
                        wrapper,
                    },
                );
            });

            const { pagination, records } = paginationResult.current;

            expect(pagination.perPage).toBe(3);

            expect(records).toHaveLength(pagination?.perPage);

            expect(records[0]).toBe(mockData[6]);
            expect(records[2]).toBe(mockData[8]);
        });

        /**
         *
         * goTo arbitrary number works
         *
         */
        const runPaginationActions = (
            name: string,
            mockData: RecordType[],
            runHook: (_ds: PaginationDataSourceResult<RecordType>) => void,
            runAssertions: (_ds: PaginationDataSourceResult<RecordType>) => void,
            initialState: Partial<DataSourceProviderProps> = {},
        ) =>
            test(name, async () => {
                const wrapper = createWrapper(Wrapper, {
                    isPaginated: true,
                    records: getMockData(),
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

        describe('goTo page number', () => {
            const mockData = getMockData();
            const runGoToPage =
                (pageNumber: number) =>
                ({ goTo }: PaginationDataSourceResult<RecordType>) => {
                    goTo({ pageNumber });
                };

            [1, 2, 3, 4].forEach(pageNumber =>
                runPaginationActions(
                    `goTo page number ${pageNumber} works`,
                    mockData,
                    runGoToPage(pageNumber),
                    pageableDatasource => {
                        const { pagination, records } = pageableDatasource;

                        expect(pagination.pageNumber).toBe(pageNumber);
                        expect(pagination?.count).toBe(pagination.perPage);
                        expect(records).toHaveLength(pagination?.perPage);

                        const [startIndex, endIndex] = getStartAndEndIndex({
                            pageNumber,
                            pageSize: pagination?.perPage,
                        });

                        expect(records[0].id).toBe(mockData[startIndex].id);
                        expect(records[9].id).toBe(mockData[endIndex].id);
                    },
                ),
            );

            [6, 7].forEach(pageNumber =>
                runPaginationActions(
                    `goTo page number ${pageNumber} works`,
                    mockData,
                    runGoToPage(pageNumber),
                    pageableDatasource => {
                        const { pagination, records } = pageableDatasource;

                        expect(pagination.pageNumber).toBe(pageNumber);
                        expect(pagination?.count).toBe(0);
                        expect(records).toHaveLength(0);
                    },
                ),
            );
        });

        /**
         *
         * goToEnd Page
         *
         */
        describe('goToEnd ', () => {
            const mockData = getMockData();

            runPaginationActions(
                `goToEnd works`,
                mockData,
                ({ goToEnd }: PaginationDataSourceResult<RecordType>) => {
                    goToEnd();
                },
                pageableDatasource => {
                    const { pagination, records } = pageableDatasource;

                    expect(pagination.pageNumber).toBe(mockData.length / 10);
                    expect(pagination?.count).toBe(pagination.perPage);
                    expect(records).toHaveLength(pagination?.perPage);

                    expect(records[0].id).toBe(mockData[30].id);
                    expect(records[9].id).toBe(mockData[39].id);
                },
            );
        });

        /**
         *
         * goToEnd Page
         *
         */
        describe('goToStart ', () => {
            const mockData = getMockData();

            runPaginationActions(
                `goToStart works`,
                mockData,
                ({ goToStart }: PaginationDataSourceResult<RecordType>) => {
                    goToStart();
                },
                pageableDatasource => {
                    const { pagination, records } = pageableDatasource;

                    expect(pagination.pageNumber).toBe(1);
                    expect(pagination?.count).toBe(pagination.perPage);
                    expect(records).toHaveLength(pagination?.perPage);

                    expect(records[0].id).toBe(mockData[0].id);
                    expect(records[9].id).toBe(mockData[9].id);
                },
                {
                    pagination: { perPage: 10, pageNumber: 4 },
                },
            );
        });

        /**
         *
         * goToNext Page
         *
         */
        describe('goToNext', () => {
            const mockData = getMockData();
            [
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 4],
                [5, 4],
                [6, 4],
            ].forEach(([pageNumber, expectedPageNumber]) => {
                runPaginationActions(
                    `goToNext: initial ${pageNumber}; expects ${expectedPageNumber}`,
                    mockData,
                    ({ goToNext }: PaginationDataSourceResult<RecordType>) => {
                        goToNext();
                    },
                    pageableDatasource => {
                        const { pagination, records } = pageableDatasource;

                        expect(pagination.pageNumber).toBe(expectedPageNumber);
                        expect(pagination.count).toBe(pagination.perPage);
                        expect(records).toHaveLength(pagination?.perPage);

                        const [startIndex, endIndex] = getStartAndEndIndex(pagination);
                        expect(records[0].id).toBe(mockData[startIndex].id);
                        expect(records[9].id).toBe(mockData[endIndex].id);
                    },
                    {
                        pagination: { perPage: 10, pageNumber },
                    },
                );
            });
        });

        /**
         *
         * goToPrev Page
         *
         */
        describe('goToPrev', () => {
            const mockData = getMockData();
            [
                [6, 4],
                [5, 4],
                [4, 3],
                [3, 2],
                [2, 1],
                [1, 1],
            ].forEach(([pageNumber, expectedPageNumber]) => {
                runPaginationActions(
                    `goToPrevious: initial ${pageNumber}; expects ${expectedPageNumber}`,
                    mockData,
                    ({ goToPrev }: PaginationDataSourceResult<RecordType>) => {
                        goToPrev();
                    },
                    pageableDatasource => {
                        const { pagination, records } = pageableDatasource;

                        expect(pagination.pageNumber).toBe(expectedPageNumber);
                        expect(pagination.count).toBe(pagination.perPage);
                        expect(records).toHaveLength(pagination?.perPage);

                        const [startIndex, endIndex] = getStartAndEndIndex(pagination);
                        expect(records[0].id).toBe(mockData[startIndex].id);
                        expect(records[9].id).toBe(mockData[endIndex].id);
                    },
                    {
                        pagination: { perPage: 10, pageNumber },
                    },
                );
            });
        });
    });
};

describe('All PageableDataSource Tests', () => {
    runTests('DataSourceContextProvider', DataSourceContextProvider);
    runTests('DataSourceProviderWithoutReducer', (props => {
        return <DataSourceProviderWithoutReducer {...props} onPaginate={reducer} />;
    }) as typeof DataSourceProviderWithoutReducer);
});
