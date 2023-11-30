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
    {
        id: '_name9',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name10',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name11',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name12',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name13',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name14',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name15',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name16',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name17',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name18',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name19',
        type: 'singleLineText',
        title: 'Name 2',
    },
    {
        id: '_name20',
        type: 'singleLineText',
        title: 'Name 2',
    },
];

const record = {
    _name: 'Thet Aung',
    _name2: 'Thadar',
    _male: true,
    _age: 26,
    _rating: 5,
    _name6: 'Thadar',
    _name7: 'Thadar',
    _name8: 'Thadar',
    _name9: 'Thadar',
    _name10: 'Thadar',
    _name11: 'Thadar',
    _name12: 'Thadar',
    _name13: 'Thadar',
    _name14: 'Thadar',
    _name15: 'Thadar',
    _name16: 'Thadar',
    _name17: 'Thadar',
    _name18: 'Thadar',
    _name19: 'Thadar',
    _name20: 'Thadar',
};

export const records = Array(1000).map((_, index) => ({
    id: index + 1,
    ...record,
}));

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
