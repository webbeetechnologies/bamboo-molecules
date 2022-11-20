import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import type { MachineTypeField, MachineState, MachineType, Machine } from './types';

type UpdateAttributePayload = { machineTypeId: string; field: MachineTypeField };
type DeleteAttributePayload = { machineTypeId: string; fieldId: string };
type UpdateMachineTypeNamePayload = { machineTypeId: string; name: string };
type UpdateMachineTypeTitlePayload = { machineTypeId: string; title: string };
type CreateMachinePayload = { machineTypeId: string };
type UpdateMachinePayload = { machine: Machine };
type DeleteMachinePayload = { id: string };

type RemoveFieldInEachMachinePayload = { refId: string };
type RemoveAllMachinesUnderOneTypePayload = { machineTypeId: string };

export const initialState: MachineState = {
    machines: [],
    machineTypes: [],
};

export const createMachineType = createAction<undefined, 'createMachineType'>('createMachineType');
export const updateMachineType = createAction<MachineType, 'updateMachineType'>(
    'updateMachineType',
);
export const deleteMachineType = createAction<string, 'deleteMachineType'>('deleteMachineType');

export const updateMachineTypeName = createAction<
    UpdateMachineTypeNamePayload,
    'updateMachineTypeName'
>('updateMachineTypeName');
export const updateMachineTypeTitle = createAction<
    UpdateMachineTypeTitlePayload,
    'updateMachineTypeTitle'
>('updateMachineTypeTitle');

export const createAttribute = createAction<UpdateAttributePayload, 'createAttribute'>(
    'createAttribute',
);
export const updateAttribute = createAction<UpdateAttributePayload, 'updateAttribute'>(
    'updateAttribute',
);
export const deleteAttribute = createAction<DeleteAttributePayload, 'deleteAttribute'>(
    'deleteAttribute',
);

export const createMachine = createAction<CreateMachinePayload, 'createMachine'>('createMachine');
export const updateMachine = createAction<UpdateMachinePayload, 'updateMachine'>('updateMachine');
export const deleteMachine = createAction<DeleteMachinePayload, 'deleteMachine'>('deleteMachine');

// cleanup
export const removeFieldInEachMachine = createAction<
    RemoveFieldInEachMachinePayload,
    'removeFieldInEachMachine'
>('removeFieldInEachMachine');
export const removeAllMachinesUnderOneType = createAction<
    RemoveAllMachinesUnderOneTypePayload,
    'removeAllMachinesUnderOneType'
>('removeAllMachinesUnderOneType');

export const machinesReducer = createReducer(initialState, {
    [createMachineType.type]: state => {
        state.machineTypes.push(createMachineTypeObject());
    },
    [updateMachineType.type]: (state, action: PayloadAction<MachineType>) => {
        const machineTypeIndex = state.machineTypes.findIndex(
            machineType => machineType.id === action.payload.id,
        );

        if (machineTypeIndex > -1) {
            state.machineTypes[machineTypeIndex] = {
                ...state.machineTypes[machineTypeIndex],
                ...action.payload,
            };
        }
    },
    [deleteMachineType.type]: (state, action: PayloadAction<string>) => {
        state.machineTypes = state.machineTypes.filter(
            machineType => machineType.id !== action.payload,
        );
    },
    [createAttribute.type]: (state, action: PayloadAction<UpdateAttributePayload>) => {
        const machineTypeIndex = state.machineTypes.findIndex(
            machineType => machineType.id === action.payload.machineTypeId,
        );

        if (machineTypeIndex > -1) {
            state.machineTypes[machineTypeIndex] = {
                ...state.machineTypes[machineTypeIndex],
                fields: [...state.machineTypes[machineTypeIndex].fields, action.payload.field],
            };
        }
    },
    [updateAttribute.type]: (state, action: PayloadAction<UpdateAttributePayload>) => {
        const machineTypeIndex = state.machineTypes.findIndex(
            machineType => machineType.id === action.payload.machineTypeId,
        );

        if (machineTypeIndex > -1) {
            const fieldIndex = state.machineTypes[machineTypeIndex].fields.findIndex(
                field => field.id === action.payload.field.id,
            );

            if (fieldIndex > -1) {
                state.machineTypes[machineTypeIndex].fields[fieldIndex] = {
                    ...state.machineTypes[machineTypeIndex].fields[fieldIndex],
                    ...action.payload.field,
                };
            }
        }
    },
    [deleteAttribute.type]: (state, action: PayloadAction<DeleteAttributePayload>) => {
        const machineTypeIndex = state.machineTypes.findIndex(
            machineType => machineType.id === action.payload.machineTypeId,
        );

        if (machineTypeIndex > -1) {
            state.machineTypes[machineTypeIndex].fields = state.machineTypes[
                machineTypeIndex
            ].fields.filter(field => field.id !== action.payload.fieldId);
        }
    },
    [updateMachineTypeName.type]: (state, action: PayloadAction<UpdateMachineTypeNamePayload>) => {
        const machineTypeIndex = state.machineTypes.findIndex(
            machineType => machineType.id === action.payload.machineTypeId,
        );

        if (machineTypeIndex > -1) {
            state.machineTypes[machineTypeIndex] = {
                ...state.machineTypes[machineTypeIndex],
                name: action.payload.name,
            };
        }
    },
    [updateMachineTypeTitle.type]: (
        state,
        action: PayloadAction<UpdateMachineTypeTitlePayload>,
    ) => {
        const machineTypeIndex = state.machineTypes.findIndex(
            machineType => machineType.id === action.payload.machineTypeId,
        );

        if (machineTypeIndex > -1) {
            state.machineTypes[machineTypeIndex] = {
                ...state.machineTypes[machineTypeIndex],
                title: action.payload.title,
            };
        }
    },

    [createMachine.type]: (state, action: PayloadAction<CreateMachinePayload>) => {
        state.machines.push(createMachineObject(state.machineTypes, action.payload.machineTypeId));
    },
    [updateMachine.type]: (state, action: PayloadAction<UpdateMachinePayload>) => {
        const machineIndex = state.machines.findIndex(
            machines => machines.id === action.payload.machine.id,
        );

        if (machineIndex > -1) {
            state.machines[machineIndex] = {
                ...state.machines[machineIndex],
                ...action.payload.machine,
            };
        }
    },
    [deleteMachine.type]: (state, action: PayloadAction<DeleteMachinePayload>) => {
        state.machines = state.machines.filter(machine => machine.id !== action.payload.id);
    },

    [removeFieldInEachMachine.type]: (
        state,
        action: PayloadAction<RemoveFieldInEachMachinePayload>,
    ) => {
        state.machines = state.machines.map(machine => ({
            ...machine,
            fields: machine.fields.filter(field => field.refId !== action.payload.refId),
        }));
    },
    [removeAllMachinesUnderOneType.type]: (
        state,
        action: PayloadAction<RemoveAllMachinesUnderOneTypePayload>,
    ) => {
        state.machines = state.machines.filter(
            machine => machine.machineTypeId !== action.payload.machineTypeId,
        );
    },
});

const createMachineTypeObject = (): MachineType => {
    const titleFieldId = nanoid();

    return {
        id: nanoid(),
        name: '',
        title: titleFieldId,
        fields: [
            {
                id: titleFieldId,
                label: 'Title',
                type: 'text',
            },
        ],
    };
};

const createMachineObject = (machineTypes: MachineType[], id: string) => {
    const selectedMachineType = machineTypes.find(machineType => machineType.id === id);

    return {
        id: nanoid(),
        machineTypeId: id,
        fields: selectedMachineType
            ? selectedMachineType.fields.map(item => ({
                  id: nanoid(),
                  refId: item.id,
                  value: '',
              }))
            : [],
    };
};

export default machinesReducer;
