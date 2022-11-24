import React, {
    createContext,
    PropsWithChildren,
    ReducerAction,
    ReducerState,
    useContext,
    useMemo,
    useReducer,
    useRef,
} from 'react';
import { Dispatch } from 'react';
import { useEffect } from 'react';
import { DataSourceError } from '../CustomError/DataSourceError';
import { DataSourceType } from './types';

export enum EDataSourceActions {
    INIT_SOURCE = 'INIT_SOURCE',
    SET_RESOLVED_RECORDS = 'SET_RESOLVED_RECORDS',
    SET_RECORDS = 'SET_RECORDS',
    UPDATE_PAYLOAD = 'UPDATE_PAYLOAD',
}

export type DataSourceActions = {
    type: `${EDataSourceActions}`;
    payload?: any;
};

type RecordsResolverType = <T extends {}>(state: any, func?: RecordsResolverType) => T[];
type ExtractInitialState = (props: any) => Record<string, any> | null;

type CreateDataSourceArgs = {
    reducer: (dataSource: any, action: any) => any;
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
    defaultResolver?: <T extends {}>(state: any, func?: RecordsResolverType) => T[];
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
        originalRecords: [...dataSource.records],
    });

    const { reducers, actionCreators, defaultResolvers, extractInitialStates, initialState } =
        dataSources.reduce(
            (
                combinedDataSources,
                { reducer, actionCreator, defaultResolver, extractInitialState, initialState: $i },
            ) => ({
                reducers: combinedDataSources.reducers.concat(reducer ?? []),
                actionCreators: combinedDataSources.actionCreators.concat(actionCreator ?? []),
                defaultResolvers: combinedDataSources.defaultResolvers.concat(
                    defaultResolver ?? [],
                ),
                extractInitialStates: combinedDataSources.extractInitialStates.concat(
                    extractInitialState ?? [],
                ),
                initialState: initialDataSourceValue ?? {
                    ...combinedDataSources.initialState,
                    ...$i,
                },
            }),
            {
                reducers: [] as CreateDataSourceArgs['reducer'][],
                actionCreators: [] as CreateDataSourceArgs['actionCreator'][],
                defaultResolvers: [] as RecordsResolverType[],
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
                    records: action.payload.records,
                    lastAction: action.type,
                };
            case EDataSourceActions.UPDATE_PAYLOAD:
                return {
                    ...dataSource,
                    ...action.payload,
                    lastAction: action.type,
                };
            case EDataSourceActions.SET_RECORDS:
                dataSource = {
                    ...dataSource,
                    originalRecords: action.payload.records,
                };
                break;
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
                records: dataSource.originalRecords,
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
    const combinedResolvers: RecordsResolverType = dataSource => {
        const records = defaultResolvers.reduce(
            (ds, resolver) => ({
                ...ds,
                records: resolver(ds),
            }),
            {
                ...dataSource,
                records: dataSource.originalRecords,
            },
        ).records;

        return records;
    };

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
        props: PropsWithChildren<{ recordsResolver?: RecordsResolverType } & DataSourceType<T>>,
    ) => {
        const { children, recordsResolver = combinedResolvers, ...rest } = props;

        /***
         *
         * Reduce Data
         *
         * */
        const [dataSource, dispatch] = useReducer(combinedReducer, null, initial => {
            return extractInitialStates.reduce(
                (state: any, extractInitialState) => ({
                    ...state,
                    ...extractInitialState(rest),
                }),
                initial as any,
            ) as { action: string };
        }) as [ReducerState<any>, Dispatch<ReducerAction<any>>];

        /***
         *
         *
         *  Store reference of props for reuse..
         *
         *
         */
        const propsRef = useRef(rest);

        /**
         *
         *
         * Update records on actions
         *
         *
         */
        useEffect(() => {
            if (dataSource.lastAction === EDataSourceActions.SET_RESOLVED_RECORDS) return;
            if (dataSource.lastAction === EDataSourceActions.UPDATE_PAYLOAD) return;

            (async () => {
                const records = await recordsResolver(
                    {
                        ...dataSource,
                        records: dataSource.originalRecords,
                    },
                    combinedResolvers,
                );
                dispatch({
                    type: EDataSourceActions.SET_RESOLVED_RECORDS,
                    payload: { records },
                });
            })();
        }, [dataSource, recordsResolver]);

        /**
         *
         * Memoize context value to avoid rerenders
         *
         */
        const value = useMemo(() => ({ dataSource, dispatch, propsRef }), [dataSource, dispatch]);

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

        // defaultResolvers;

        // console.log({ dataSource });
        const dataSources = actionCreators.map(actionCreator =>
            actionCreator(propsRef.current, dataSource, dispatch),
        );

        return useMemo(
            () =>
                dataSources.reduce(
                    (combinedResults, result) => ({ ...combinedResults, ...result }),
                    dataSource,
                ),
            [dataSource, ...dataSources],
        );
    };

    return {
        DataSourceProvider,
        useDataSourceHook,
        useDataSourceDispatch,
    };
};
