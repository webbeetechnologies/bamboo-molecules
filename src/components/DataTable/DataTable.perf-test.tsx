import { measurePerformance } from 'reassure';
import { DataTable } from './DataTable';
import { getDataTableMockProps } from './__mocks__/getDataTableProps';
import { ProvideMolecules } from '../../core';
import { View } from 'react-native';

const mockArgs = getDataTableMockProps(2, 10) as any;

const viewStyle = { height: 200 };
test('Count increments on press', done => {
    measurePerformance(
        <View style={viewStyle}>
            <DataTable {...mockArgs} />
        </View>,
        {
            runs: 10,
            wrapper: element => <ProvideMolecules>{element}</ProvideMolecules>,
        },
    )
        .then(measure => {
            expect(measure.runs).toBeLessThanOrEqual(10);
            expect(measure.meanDuration).toBeLessThanOrEqual(100);

            done();
        })
        .catch(e => {
            console.error(e);
            throw e;
        });
}, 60_000);
