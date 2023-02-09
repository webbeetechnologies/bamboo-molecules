import { FC, PropsWithChildren } from 'react';
import { cleanup, renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createDataSource } from '../../createDataSource';
import { getDefaultLoadableDataSource, useLoadableDataSource } from '../index';
import { DataSourcePresenterType, DataSourceType } from '../../types';

import { LoadableDataSourceProps, LoadableDataSourceResult, OnLoad } from '../types';

import {
    createTestWrapper,
    CreateTestWrapper,
} from '../../../../testUtils/utils/createTestWrapper';
import { getMockData } from '../../../../__mocks__/src/mockData';
import { RecordType } from '../../../types';
import { createDataSourceHookWithFunc } from '../../../../testUtils/utils/useDataSourceHookWithFunc';

const createWrapper: CreateTestWrapper<DataSourceProviderProps> = createTestWrapper;

type DataSourceProviderProps = Partial<LoadableDataSourceProps> &
    Partial<DataSourceType<RecordType>>;

const dataSourceObject = getDefaultLoadableDataSource();

const DataSourceContextProvider = createDataSource('Loadable DataSource without reducer', [
    dataSourceObject,
]).DataSourceProvider as FC<PropsWithChildren<DataSourceProviderProps>>;

const recordsPresenter: DataSourcePresenterType<RecordType> = async dataSource => {
    if (dataSource.lastAction === 'INIT_SOURCE') {
        return dataSource;
    }

    return {
        records: getMockData(),
    };
};

const onLoad: OnLoad = () => {
    return {
        startedAt: Date.now(),
        finishedAt: Date.now(),
        erroredAt: Date.now(),
    };
};

const useDataSourceHookWithFunc = createDataSourceHookWithFunc(() =>
    useLoadableDataSource<RecordType>(),
);

const runTests = (key: string, Wrapper: typeof DataSourceContextProvider) => {
    describe(`${key} Loadable Data Source`, () => {
        afterEach(cleanup);

        /**
         *
         * Is not a loadable datasource
         *
         */
        test('is not loadable', async () => {
            const wrapper = createWrapper(Wrapper, {})
            const { result } = await act(async () => {
                return renderHook(() => useLoadableDataSource(), {
                    wrapper,
                });
            });

            expect(result.current.isLoadable).toBe(false);
        });

        /**
         *
         * Is not a loadable datasource
         *
         */
        test('is loadable', async () => {
            const wrapper = createWrapper(Wrapper, { isLoadable: true });

            const { result: filteredDataSource } = await act(async () => {
                return renderHook(() => useLoadableDataSource(), {
                    wrapper,
                });
            });

            const {
                records,
                isLoadable,
                hasStarted,
                hasErrored,
                hasLoaded,
                isLoading,
                fetchRecords,
            } = filteredDataSource.current;

            expect(isLoadable).toBe(true);

            expect(hasStarted).toBe(false);
            expect(hasErrored).toBe(false);
            expect(hasLoaded).toBe(false);
            expect(isLoading).toBe(false);
            expect(fetchRecords).toBeInstanceOf(Function);

            expect(records).toBeInstanceOf(Array);
            expect(records).toHaveLength(0);
        });

        /**
         *
         * Is loadable datasource with records
         *
         */
        test('is loadable with records', async () => {
            const mockData = getMockData();
            const wrapper = createWrapper(Wrapper, { isLoadable: true, records: mockData });

            const { result: filteredDataSource } = await act(async () => {
                return renderHook(() => useLoadableDataSource(), {
                    wrapper,
                });
            });

            const { isLoadable, records } = filteredDataSource.current;

            expect(isLoadable).toBe(true);

            expect(records).toBeInstanceOf(Array);
            expect(records).toHaveLength(40);
        });

        /**
         *
         * Is loadable datasource with records
         *
         */
        type RunLoadableFunc = (prop: LoadableDataSourceResult & { records: RecordType[] }) => void;
        const runLoadableActions = (
            name: string,
            mockData: RecordType[],
            runHook: RunLoadableFunc,
            runAssertions: RunLoadableFunc,
            initialState: Partial<DataSourceProviderProps> = {},
        ) =>
            test(name, async () => {
                const wrapper = createWrapper(Wrapper, {
                    isLoadable: true,
                    ...initialState,
                });

                const { result: pageableDatasource } = await act(async () => {
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

        const runTest = (name: string, runHook: RunLoadableFunc, runAssertions: RunLoadableFunc) =>
            runLoadableActions(name, [], runHook, runAssertions, {});

        runTest(
            `fetchRecords`,
            ({ fetchRecords }) => {
                fetchRecords();
            },
            pageableDatasource => {
                const { hasStarted, hasLoaded, hasErrored, isLoading, fetchRecords, records } =
                    pageableDatasource;

                expect(hasStarted).toBe(false);
                expect(hasErrored).toBe(false);
                expect(hasLoaded).toBe(false);
                expect(isLoading).toBe(false);
                expect(fetchRecords).toBeInstanceOf(Function);

                expect(records).toBeInstanceOf(Array);
                expect(records).toHaveLength(40);
            },
        );
    });
};

describe('All LoadableDataSource Tests', () => {
    runTests('DataSourceContextProvider', props => (
        <DataSourceContextProvider {...props} recordsPresenter={recordsPresenter} onLoad={onLoad} />
    ));
});
