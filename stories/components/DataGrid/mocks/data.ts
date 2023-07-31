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
        title: 'Name',
    },
    {
        id: '_name2',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_male',
        type: 'checkbox',
        title: 'Male?',
    },
    {
        id: '_age',
        type: 'number',
        title: 'Age',
    },
    {
        id: '_rating',
        type: 'rating',
        title: 'Rating',
    },
    {
        id: '_name6',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name7',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name8',
        type: 'singleLineText',
        title: 'Name 2',
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
    title: `Name ${i + 1}`,
}));

const possibleValues = {
    [virtualizationMockFields[0].id]: ['A', 'B', 'C', 'null'],
    [virtualizationMockFields[1].id]: ['1', '2', '3', '4', 'null'],
    [virtualizationMockFields[2].id]: ['true', 'false', 'null'],
};

const getAPossibleValueOrDefault = (fieldId: number, rowIndex: number) => {
    const arr = possibleValues[fieldId];
    if (!arr) return `John-${`record-${rowIndex + 1}`}-${fieldId}`;

    return arr.at(rowIndex % arr.length);
};

export const groups = Object.keys(possibleValues);

export const virtaulizationMockRecords = generateFlatListData(1000, i => {
    const fieldIds = virtualizationMockFields.map(field => field.id);

    return {
        id: `record-${i + 1}`,
        ...fieldIds.reduce((acc, fieldId) => {
            acc[fieldId] = getAPossibleValueOrDefault(fieldId, i);
            return acc;
        }, {} as Record<string, any>),
    };
});
