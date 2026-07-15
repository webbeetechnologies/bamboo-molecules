import { getRegisteredComponentWithFallback } from '../../core';
import SelectRoot, {
    SelectContent,
    SelectDropdown,
    SelectOption,
    SelectSearchInput,
    SelectTrigger,
    SelectTriggerOutline,
    SelectValue,
} from './Select';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Select = Object.assign(getRegisteredComponentWithFallback('Select', SelectRoot), {
    Trigger: SelectTrigger,
    TriggerOutline: SelectTriggerOutline,
    Value: SelectValue,
    Dropdown: SelectDropdown,
    Content: SelectContent,
    Option: SelectOption,
    SearchInput: SelectSearchInput,
});

export * from './context';
export type * from './types';
export * from './utils';
