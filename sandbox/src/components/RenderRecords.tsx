import * as React from 'react';
import { RecordType } from '../types';
import { ApplySort } from './ApplySortDemo';
import { ApplyFilters } from './ApplyFilterDemo';
import { ApplyPagination } from './ApplyPaginationDemo';
import { useDataSource } from '../DataSource';
import { LoadingStatus } from './LoadingStatus';

const RenderRecords: React.FC<any> = _props => {
    const ds = useDataSource();

    return (
        <div
            style={{
                display: 'flex',
                width: '90vw',
                height: '90vh',
                margin: '5vh 5vw',
                alignItems: 'flex-start',
            }}>
            <div
                style={{
                    flex: 1,
                    padding: '2em',
                    height: '100%',
                    boxSizing: 'border-box',
                    overflow: 'auto',
                }}>
                <LoadingStatus />
                {ds.records && (
                    <ul>
                        {!ds.records.length ? (
                            <h4>No records to display</h4>
                        ) : (
                            ds.records.map((worker: RecordType) => (
                                <Coworker worker={worker} key={worker.id} />
                            ))
                        )}
                    </ul>
                )}
            </div>
            <div
                style={{
                    flex: 1,
                    height: '100%',
                    padding: '2em',
                    backgroundColor: '#e5e5e5',
                    overflow: 'auto',
                    boxSizing: 'border-box',
                }}>
                <ApplyPagination />
                <ApplySort />
                <ApplyFilters />
            </div>
        </div>
    );
};

export default RenderRecords;

const Coworker = (props: { worker: RecordType }) => {
    const worker = props.worker;
    return (
        <li>
            {worker.id} {worker.first_name} {worker.last_name}
        </li>
    );
};
