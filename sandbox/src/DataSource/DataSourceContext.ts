import { createContext, useContext } from 'react';
import { DataSourceError } from '../CustomError/DataSourceError';

/**
 *
 * Context for the Datasource.
 *
 */
export const DataSourceContext = createContext<any>(null);

/**
 *
 * Hook to get the datasource context
 *
 */
export const useDataSourceContext = () => {
    const ds = useContext(DataSourceContext);
    if (!ds) throw new DataSourceError('useDataSourceContext is called outside DataSourceProvider');

    return ds;
};

/**
 *
 * Hook to get the datasource
 *
 */
export const useDataSource = () => useDataSourceContext().useDataSourceHook();

/**
 *
 * Hook to fetch the datasource dispatch
 *
 */
export const useDataSourceDispatch = () => useDataSourceContext().context.dispatch;
