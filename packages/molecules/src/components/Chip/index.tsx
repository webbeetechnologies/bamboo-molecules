import { default as ChipComponent, Props as ChipProps } from './Chip';
import type { ComponentType } from 'react';

export const Chip = Object.assign(
    // @component ./Chip.tsx
    ChipComponent,
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

export { Props as ChipProps } from './Chip';
export { styles as chipStyles } from './utils';
