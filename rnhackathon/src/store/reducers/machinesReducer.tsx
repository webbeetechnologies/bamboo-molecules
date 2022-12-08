import {
  ActionTypes,
  Machines,
  MachineState,
  MachinesType,
  MachineTypesFields,
  MachineTypesFieldsValue,
} from '../types';

function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    '',
  );
}

const initialState: MachineState = {
  machine_types: [
    {
      id: '0',
      name: 'Cranes',
      title_id: '1',
    },
  ],
  machines: [{id: '0', machine_type_id: '0'}],
  machine_types_fields: [
    {
      id: '1',
      name: 'Model',
      machine_type_id: '0',
      type: 'TEXT',
    },
    {
      id: '2',
      name: 'Power',
      machine_type_id: '0',
      type: 'NUMBER',
    },
  ],
  machine_types_fields_value: [
    {
      id: '0',
      value: 'Truck Mounted',
      machine_type_field_id: '1',
      machine_id: '0',
    },
  ],
};

type Payload = {
  id: string;
  name: string;
  property: string;
  value: string;
  machine_type_id: string;
  machine_type_field_id: string;
  machine_id: string;
};
const machinesReducer = (
  state = initialState,
  action: {
    type: string;
    payload: Payload;
  },
) => {
  switch (action.type) {
    case ActionTypes.ADD_MACHINE: {
      return {
        ...state,
        machines: [
          ...state.machines,
          {
            id: uid(),
            machine_type_id: action.payload.machine_type_id,
          },
        ],
      };
    }

    case ActionTypes.DELETE_MACHINE: {
      return {
        ...state,
        machines: state.machines.filter(
          (m: Machines) => m.id !== action.payload.id,
        ),
      };
    }

    case ActionTypes.ADD_MACHINE_TYPE: {
      const machine_type_id = uid();
      const field_id = uid();
      return {
        ...state,
        machine_types: [
          ...state.machine_types,
          {
            id: machine_type_id,
            name: 'New Category',
            title_id: field_id,
          },
        ],
        machine_types_fields: [
          ...state.machine_types_fields,
          {
            id: field_id,
            name: '',
            machine_type_id: machine_type_id,
            type: 'TEXT',
          },
        ],
      };
    }

    case ActionTypes.UPDATE_MACHINE_TYPE: {
      return {
        ...state,
        machine_types: state.machine_types.map((mt: MachinesType) => {
          return mt.id === action.payload.id
            ? {
                ...mt,
                [action.payload.property]: action.payload.value,
              }
            : mt;
        }),
      };
    }

    case ActionTypes.DELETE_MACHINE_TYPE: {
      return {
        ...state,
        machine_types: state.machine_types.filter(
          (mt: MachinesType) => mt.id !== action.payload.id,
        ),
        machines: state.machines.filter(
          (m: Machines) => m.machine_type_id !== action.payload.id,
        ),
      };
    }

    case ActionTypes.ADD_MACHINE_TYPES_FIELD: {
      return {
        ...state,
        machine_types_fields: [
          ...state.machine_types_fields,
          {
            id: uid(),
            name: action.payload.name,
            machine_type_id: action.payload.machine_type_id,
            type: 'TEXT',
          },
        ],
      };
    }

    case ActionTypes.UPDATE_MACHINE_TYPES_FIELD: {
      return {
        ...state,

        machine_types_fields: state.machine_types_fields.map(
          (mtf: MachineTypesFields) => {
            return mtf.id === action.payload.id
              ? {
                  ...mtf,
                  [action.payload.property]: action.payload.value,
                }
              : mtf;
          },
        ),
      };
    }

    case ActionTypes.DELETE_MACHINE_TYPES_FIELD: {
      return {
        ...state,
        machine_types_fields: state.machine_types_fields.filter(
          (mtf: MachineTypesFields) => mtf.id !== action.payload.id,
        ),
        machine_types_fields_value: state.machine_types_fields_value.filter(
          (mtfv: MachineTypesFieldsValue) =>
            mtfv.machine_type_field_id !== action.payload.id,
        ),
      };
    }

    case ActionTypes.ADD_MACHINE_TYPES_FIELD_VALUE: {
      return {
        ...state,
        machine_types_fields_value: [
          ...state.machine_types_fields_value,
          {
            id: uid(),
            value: action.payload.value,
            machine_type_field_id: action.payload.machine_type_field_id,
            machine_id: action.payload.machine_id,
          },
        ],
      };
    }

    case ActionTypes.UPDATE_MACHINE_TYPES_FIELD_VALUE: {
      return {
        ...state,
        machine_types_fields_value: state.machine_types_fields_value.map(
          (mtfv: MachineTypesFieldsValue) => {
            return mtfv.id === action.payload.id
              ? {
                  ...mtfv,
                  value: action.payload.value,
                }
              : mtfv;
          },
        ),
      };
    }

    default: {
      return state;
    }
  }
};

export default machinesReducer;
