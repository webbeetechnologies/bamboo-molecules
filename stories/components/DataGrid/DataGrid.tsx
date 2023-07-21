import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useWindowDimensions } from 'react-native';
import { Table } from '../../../src/datagrid';
import { useMemo } from 'react';
import { fields, records, virtaulizationMockRecords, virtualizationMockFields } from './mock';

export const Example = () => {
    const { View } = useMolecules();
    const dimensions = useWindowDimensions();

    const containerStyle = useMemo(() => ({ width: dimensions.width }), [dimensions.width]);

    return (
        <View style={containerStyle}>
            <Table
                records={records}
                fields={fields}
                extractColumnId={field => `${field.id}`}
                extractRecordId={record => `${record.id}`}
            />
        </View>
    );
};

export const ExampleHorizontalVirtualization = () => {
    const { View } = useMolecules();

    const containerStyle = useMemo(() => ({ width: 500, height: 500 }), []);

    return (
        <View style={containerStyle}>
            <Table
                records={virtaulizationMockRecords}
                fields={virtualizationMockFields}
                extractColumnId={field => `${field.id}`}
                extractRecordId={record => `${record.id}`}
            />
        </View>
    );
};
