import React, {
    createContext,
    PropsWithChildren,
    ReducerAction,
    ReducerState,
    useCallback,
    useContext,
    useMemo,
    useReducer,
    useRef,
} from 'react';
import { Dispatch } from 'react';
import { useEffect } from 'react';
import { DataSourceError } from '../CustomError/DataSourceError';
import { DataSourceType } from './types';
import { combinePresenters, DataSourcePresenterType } from './utils';

export enum EDataSourceActions {
    INIT_SOURCE = 'INIT_SOURCE',
    SET_RESOLVED_RECORDS = 'SET_RESOLVED_RECORDS',
    UPDATE_PAYLOAD = 'UPDATE_PAYLOAD',
}

export type DataSourceActions = {
    type: `${EDataSourceActions}`;
    payload?: any;
};

type ExtractInitialState = (props: any) => Record<string, any> | null;

export enum EDataSourcePhase {
    BEFORE_DATA = 'BEFORE_DATA',
    ON_DATA = 'ON_DATA',
}

type CreateDataSourceArgs = {
    phase: `${EDataSourcePhase}`;
    reducer?: (dataSource: any, action: any) => any;
    actionCreator: <
        T extends {},
        S extends DataSourceType<T>,
        A extends DataSourceActions,
        P extends unknown = unknown,
    >(
        props: P,
        state: S,
        dispatch: (action: A) => void,
    ) => Record<string, any> | null;
    defaultPresenter?: DataSourcePresenterType;
    extractInitialState?: ExtractInitialState;
    initialState: Record<string, any>;
};

export const createDataSource = (
    dataSources: CreateDataSourceArgs[],
    initialDataSourceValue: Record<string, any> | null = null,
) => {
    const initialStateExtractor: ExtractInitialState = dataSource => ({
        records: dataSource.records,
        lastAction: EDataSourceActions.INIT_SOURCE,
    });

    const {
        reducers,
        actionCreators,
        defaultPresenters,
        extractInitialStates,
        initialState,
        hasBeforeDataPhase,
    } = dataSources.reduce(
        (
            combinedDataSources,
            {
                phase = EDataSourcePhase.ON_DATA,
                reducer,
                actionCreator,
                defaultPresenter,
                extractInitialState,
                initialState: $i,
            },
        ) => ({
            hasBeforeDataPhase:
                combinedDataSources.hasBeforeDataPhase || phase === EDataSourcePhase.BEFORE_DATA,
            reducers: combinedDataSources.reducers.concat(reducer ?? []),
            actionCreators: combinedDataSources.actionCreators.concat(actionCreator ?? []),
            defaultPresenters: combinedDataSources.defaultPresenters.concat(defaultPresenter ?? []),
            extractInitialStates: combinedDataSources.extractInitialStates.concat(
                extractInitialState ?? [],
            ),
            initialState: initialDataSourceValue ?? {
                ...combinedDataSources.initialState,
                ...$i,
            },
        }),
        {
            hasBeforeDataPhase: false,
            reducers: [] as CreateDataSourceArgs['reducer'][],
            actionCreators: [] as CreateDataSourceArgs['actionCreator'][],
            defaultPresenters: [] as DataSourcePresenterType[],
            extractInitialStates: [initialStateExtractor] as ExtractInitialState[],
            initialState: initialDataSourceValue as Record<string, any>,
        },
    );

    /**
     *
     * Take all the reducers from dataSources and combines to make one output
     *
     */
    const combinedReducer: CreateDataSourceArgs['reducer'] = (dataSource: any, action: any) => {
        switch (action.type) {
            case EDataSourceActions.SET_RESOLVED_RECORDS:
                return {
                    ...dataSource,
                    ...action.payload,
                    lastAction: action.type,
                };
            case EDataSourceActions.UPDATE_PAYLOAD:
                return {
                    ...dataSource,
                    ...action.payload,
                };
        }

        /**
         *
         * Prevent flash of rerender with all records.
         */
        const records = dataSource.records;

        const resultDS = reducers.reduce(
            (ds, reducer) => ({
                ...ds,
                ...reducer(ds, action),
            }),
            {
                ...dataSource,
                lastAction: action.type,
            },
        );

        return {
            ...resultDS,
            records,
        };
    };

    /**
     *
     * Takes the result of one result resolver and passes it to the next.
     * Thereby reducing the results.
     * If a resolver function is passed, it's the responsibility of the resolver function to handle result output.
     */
    const combinedPresenters: DataSourcePresenterType = combinePresenters(defaultPresenters);

    /**
     *
     * Context for the Datasource.
     *
     */
    const DataSourceContext = createContext<any>(initialState);

    /**
     *
     * Normalized Provider for the Datasource
     *
     */
    const DataSourceProvider = <T extends {}>(
        props: PropsWithChildren<
            { recordsPresenter?: DataSourcePresenterType } & DataSourceType<T>
        >,
    ) => {
        const { children, recordsPresenter = combinedPresenters, ...rest } = props;

        /***
         *
         * Reduce Data
         *
         * */
        const [dataSource, handleDispatch] = useReducer(combinedReducer, null, initial => {
            return extractInitialStates.reduce(
                (state: any, extractInitialState) => ({
                    ...state,
                    ...extractInitialState(rest),
                }),
                initial as any,
            ) as { action: string };
        }) as [ReducerState<any>, Dispatch<ReducerAction<any>>];

        const dispatch = useCallback(
            ({ type, payload }) => {
                handleDispatch({
                    type,
                    payload: { ...payload },
                });
            },
            [handleDispatch],
        );

        /***
         *
         *
         *  Store reference of props for reuse..
         *
         *
         */
        const propsRef = useRef(rest);
        propsRef.current = rest;

        /**
         *
         *
         * Update records on actions
         *
         *
         */
        useEffect(() => {
            if (dataSource.lastAction === EDataSourceActions.SET_RESOLVED_RECORDS) return;

            (async () => {
                const recordsProp = propsRef.current.records;
                const presentedDataSource = await recordsPresenter(
                    {
                        ...dataSource,
                        records: recordsProp,
                    },
                    combinedPresenters,
                );

                debugger;
                handleDispatch({
                    type: EDataSourceActions.SET_RESOLVED_RECORDS,
                    payload: presentedDataSource,
                });
            })();
        }, [dataSource, recordsPresenter, propsRef, handleDispatch]);

        /**
         *
         * Memoize context value to avoid rerenders
         *
         */
        const value = useMemo(
            () => ({ dataSource, dispatch, propsRef }),
            [dataSource, dispatch, propsRef],
        );

        return <DataSourceContext.Provider value={value}>{children}</DataSourceContext.Provider>;
    };

    /**
     *
     * Hook to get the datasource context
     *
     */
    const useDataSourceContext = () => {
        const context = useContext(DataSourceContext);
        if (!context)
            throw new DataSourceError('useDataSourceContext is called outside DataSourceProvider');
        return context;
    };

    /**
     *
     * Hook to fetch the datasource dispatch
     *
     */
    const useDataSourceDispatch = () => useDataSourceContext().dispatch;

    /**
     *
     * Run all hooks in a loop. and merge the results into one output.
     * All methods are added and thus returned as one combined data source.
     *
     */
    const useDataSourceHook = () => {
        const { dataSource, propsRef, dispatch } = useDataSourceContext();

        // to temporary store the result of the previous data source.
        // records could be updated and updated records need to be passed down..
        let tempDS = {
            ...dataSource,
            totalRecordsCount: dataSource?.totalRecordsCount ?? propsRef.current.records.length,
            records: hasBeforeDataPhase ? dataSource.records : propsRef.current.records,
        };

        const dataSourceResults = actionCreators.map(actionCreator => {
            const result = actionCreator(propsRef.current, tempDS, dispatch);

            tempDS = {
                ...tempDS,
                ...result,
            };

            return result;
        });

        return useMemo(
            () =>
                dataSourceResults.reduce(
                    (combinedResults, result) => ({ ...combinedResults, ...result }),
                    dataSource,
                ),

            [dataSource, ...dataSourceResults],
        );
    };

    return {
        DataSourceProvider,
        useDataSourceHook,
        useDataSourceDispatch,
    };
};
