export interface RootState {
  machinesReducer: MachineState;
}

export const enum ActionTypes {
  ADD_MACHINE = 'ADD_MACHINE',
  DELETE_MACHINE = 'DELETE_MACHINE',

  ADD_MACHINE_TYPE = 'ADD_MACHINE_TYPE',
  UPDATE_MACHINE_TYPE = 'UPDATE_MACHINE_TYPE',
  DELETE_MACHINE_TYPE = 'DELETE_MACHINE_TYPE',

  ADD_MACHINE_TYPES_FIELD = 'ADD_MACHINE_TYPES_FIELD',
  UPDATE_MACHINE_TYPES_FIELD = 'UPDATE_MACHINE_TYPES_FIELD',
  DELETE_MACHINE_TYPES_FIELD = 'DELETE_MACHINE_TYPES_FIELD',

  ADD_MACHINE_TYPES_FIELD_VALUE = 'ADD_MACHINE_TYPES_FIELD_VALUE',
  UPDATE_MACHINE_TYPES_FIELD_VALUE = 'UPDATE_MACHINE_TYPES_FIELD_VALUE',
}

export interface Machines {
  id: string;
  machine_type_id: string;
}

export interface MachinesType {
  id: string;
  name: string;
  title_id: string;
}
export interface MachineTypesFields {
  id: string;
  name: string;
  machine_type_id: string;
  type: string;
}
export interface MachineTypesFieldsValue {
  id: string;
  value: string;
  machine_type_field_id: string;
  machine_id: string;
}

export interface MachineState {
  machine_types: MachinesType[];
  machines: Machines[];
  machine_types_fields: MachineTypesFields[];
  machine_types_fields_value: MachineTypesFieldsValue[];
}

export const enum FieldTypes {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}
