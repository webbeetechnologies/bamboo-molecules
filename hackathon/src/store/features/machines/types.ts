export type MachinesAttributeValues = Date | string | number | boolean;
export type MachinesAttributeTypes = 'date' | 'text' | 'number' | 'checkbox';

export interface MachineType {
    id: string;
    name: string;
    title: string | null; // id of the field that will be used as title
    fields: MachineTypeField[];
}

export interface MachineTypeField {
    id: string;
    label: string;
    type: MachinesAttributeTypes;
}

export interface Machine {
    id: string;
    machineTypeId: string;
    fields: MachineField[];
}

export interface MachineField {
    id: string;
    refId: string; // referenceId of the field in the machineType
    value: MachinesAttributeValues;
}

export interface MachineState {
    machines: Machine[];
    machineTypes: MachineType[];
}
