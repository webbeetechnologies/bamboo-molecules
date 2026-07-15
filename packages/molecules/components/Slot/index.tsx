import { getRegisteredComponentWithFallback } from '../../core';
import { Slot as SlotComponent, Slottable } from './Slot';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Slot = Object.assign(getRegisteredComponentWithFallback('Slot', SlotComponent), {
    Slottable,
    Root: SlotComponent,
});

export { createSlot, createSlottable, type SlotProps } from './Slot';
