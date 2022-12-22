import { useDataSource } from '../DataSource';

export const LoadingStatus = () => {
    const ds = useDataSource();
    if (!ds.isLoadable) return null;

    if (ds.isLoading) return <h1>Loading</h1>;

    if (ds.hasLoaded) {
        return <h1>Ready</h1>;
    }

    if (ds.hasErrored) return <h1>Errored</h1>;

    return <h1>Not Started</h1>;
};
