import type { Machine, MachineType } from '../features/machines/types';

export const normalizeMachines = (
    machines: Machine[],
    machineTypes: MachineType[],
    id: string | undefined,
) => {
    const groupedMachines = machines.reduce(
        (acc: Record<string, MachineType & { data: Machine[] }>, current) => {
            acc[current.machineTypeId] = acc[current.machineTypeId] || {
                data: [],
                ...machineTypes.find(type => type.id === current.machineTypeId),
            };
            (acc[current.machineTypeId].data = acc[current.machineTypeId]?.data || []).push(
                current,
            );
            return acc;
        },
        {},
    );

    return id && groupedMachines[id]
        ? [groupedMachines[id]]
        : Object.keys(groupedMachines).reduce(
              (
                  acc: (MachineType & { data: Machine[] })[],
                  current: keyof typeof groupedMachines,
              ) => {
                  acc.push(groupedMachines[current]);

                  return acc;
              },
              [],
          );
};
