import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useWindowDimensions } from 'react-native';
import { Table } from '../../../src/datagrid';
import { useMemo } from 'react';
import { fields, records } from './mock';

export const Example = () => {
    const { View } = useMolecules();
    const dimensions = useWindowDimensions();

    const containerStyle = useMemo(() => ({ width: dimensions.width }), [dimensions.width]);

    return (
        <View style={containerStyle}>
            <Table records={records} fields={fields} />
        </View>
    );
};
