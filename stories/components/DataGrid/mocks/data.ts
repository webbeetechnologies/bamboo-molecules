import type { Field } from '@bambooapp/bamboo-molecules/datagrid';
import { generateFlatListData } from '../../../../__mocks__/generateFlatListData';

// import { SELECTION_COL_ID } from '../../../src/datagrid/components/Table/utils';

// const fieldsConfigs = {
//     [SELECTION_COL_ID]: {
//         width: 50,
//     },
//     _name: {
//         width: 200,
//     },
// };

export const fields: Field[] = [
    {
        id: '_name',
        type: 'singleLineText',
        displayTitle: 'Name',
    },
    {
        id: '_name2',
        type: 'singleLineText',
        displayTitle: 'Name 2',
    },
    {
        id: '_male',
        type: 'checkbox',
        displayTitle: 'Male?',
    },
    {
        id: '_age',
        type: 'number',
        displayTitle: 'Age',
    },
    {
        id: '_rating',
        type: 'rating',
        displayTitle: 'Rating',
    },
    {
        id: '_name6',
        type: 'singleLineText',
        displayTitle: 'Name 2',
    },
    {
        id: '_name7',
        type: 'singleLineText',
        displayTitle: 'Name 2',
    },
    {
        id: '_name8',
        type: 'singleLineText',
        displayTitle: 'Name 2',
    },
];

export const records = [
    {
        id: 1,
        _name: 'Thet Aung',
        _name2: 'Thadar',
        _male: true,
        _age: 26,
        _rating: 5,
        _name6: 'Thadar',
        _name7: 'Thadar',
        _name8: 'Thadar',
    },
    {
        id: 2,
        _name: 'Thet Aung',
        _name2: 'Thadar',
        _male: false,
        _age: 26,
        _rating: 3,
        _name6: 'Thadar',
        _name7: 'Thadar',
        _name8: 'Thadar',
    },
    {
        id: 3,
        _name: 'Thet Aung',
        _name2: 'Thadar',
        _male: true,
        _age: 26,
        _rating: 4,
        _name6: 'Thadar',
        _name7: 'Thadar',
        _name8: 'Thadar',
    },
];

export const virtualizationMockFields = generateFlatListData(100, i => ({
    id: `_name-${i + 1}`,
    type: 'singleLineText',
    displayTitle: `Name ${i + 1}`,
}));

export const virtaulizationMockRecords = generateFlatListData(1000, i => {
    const fieldIds = virtualizationMockFields.map(field => field.id);

    return {
        id: `record-${i + 1}`,
        ...fieldIds.reduce((acc, fieldId) => {
            acc[fieldId] = `John-${`record-${i + 1}`}-${fieldId}`;
            return acc;
        }, {} as Record<string, any>),
    };
});
