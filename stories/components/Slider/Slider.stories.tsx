import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { RangeSliderExample, SliderExample } from './Slider';

export default {
    title: 'components/Slider',
    component: SliderExample,

    argTypes: {},
} as ComponentMeta<typeof SliderExample>;

export const Default: ComponentStory<typeof SliderExample> = args => <SliderExample {...args} />;

Default.args = {};

export const RangeSlider: ComponentStory<typeof RangeSliderExample> = args => (
    <RangeSliderExample {...args} />
);

RangeSlider.args = {};
