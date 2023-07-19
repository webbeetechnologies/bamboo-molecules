import type { Field } from '@bambooapp/bamboo-molecules/datagrid';

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
        returnField: {
            type: 'singleLineText',
            returnType: 'string',
            description: '',
        },
        options: {},
        returnType: 'string',
    },
    {
        id: '_name2',
        type: 'singleLineText',
        displayTitle: 'Name 2',
        returnField: {
            type: 'singleLineText',
            returnType: 'string',
            description: '',
        },
        options: {},
        returnType: 'string',
    },
    {
        id: '_male',
        type: 'checkbox',
        displayTitle: 'Male?',
        returnField: {
            type: 'checkbox',
            returnType: 'boolean',
            description: '',
        },
        options: {},
        returnType: 'boolean',
    },
    {
        id: '_age',
        type: 'number',
        displayTitle: 'Age',
        returnField: {
            type: 'number',
            returnType: 'number',
            description: '',
        },
        options: {},
        returnType: 'number',
    },
    {
        id: '_rating',
        type: 'rating',
        displayTitle: 'Rating',
        returnField: {
            type: 'rating',
            returnType: 'number',
            description: '',
        },
        options: {},
        returnType: 'number',
    },
    {
        id: '_name6',
        type: 'singleLineText',
        displayTitle: 'Name 2',
        returnField: {
            type: 'singleLineText',
            returnType: 'string',
            description: '',
        },
        options: {},
        returnType: 'string',
    },
    {
        id: '_name7',
        type: 'singleLineText',
        displayTitle: 'Name 2',
        returnField: {
            type: 'singleLineText',
            returnType: 'string',
            description: '',
        },
        options: {},
        returnType: 'string',
    },
    {
        id: '_name8',
        type: 'singleLineText',
        displayTitle: 'Name 2',
        returnField: {
            type: 'singleLineText',
            returnType: 'string',
            description: '',
        },
        options: {},
        returnType: 'string',
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
