import { useDataSource } from '../DataSource';

export const LoadingStatus = () => {
    const ds = useDataSource();
    if (!ds.isLoadable) return null;

    if (ds.isLoading)
        return (
            <div>
                <h1 style={{ zIndex: 10, position: 'relative' }}>Loading</h1>
                <div
                    style={{
                        zIndex: 9,
                        position: 'absolute',
                        backgroundColor: '#fff',
                        opacity: 0.7,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                />
            </div>
        );

    if (ds.hasLoaded) {
        return <h1>Ready</h1>;
    }

    if (ds.hasErrored)
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <h1>Errored</h1>
                <button onClick={ds.fetchRecords}>try again</button>
            </div>
        );

    return <h1>Not Started</h1>;
};
