import type { ComponentType } from 'react';

import { getRegisteredComponentWithFallback } from '../../core';
import { default as ChipComponent, type Props as ChipProps } from './Chip';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Chip = Object.assign(
    // @component ./Chip.tsx
    getRegisteredComponentWithFallback('Chip', ChipComponent),
    {
        Assist: ChipComponent as ComponentType<
            Omit<
                ChipProps,
                | 'onClose'
                | 'closeIconName'
                | 'closeIconType'
                | 'selected'
                | 'selectedColor'
                | 'selectionBackgroundColor'
            >
        >,
        Filter: ChipComponent as ComponentType<
            Omit<ChipProps, 'onClose' | 'closeIconName' | 'closeIconType'>
        >,
        Input: ChipComponent,
        Suggestion: ChipComponent as ComponentType<
            Omit<
                ChipProps,
                | 'onClose'
                | 'closeIconName'
                | 'closeIconType'
                | 'selected'
                | 'selectedColor'
                | 'selectionBackgroundColor'
                | 'left'
                | 'right'
                | 'leftElementContainerStyle'
                | 'rightElementContainerStyle'
            >
        >,
    },
);

export type { Props as ChipProps } from './Chip';
export type { States } from './utils';
export { styles as chipStyles } from './utils';
