import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

import { delay } from '../../common';
import { Example, ControlledExample } from './UseControlledValue';
import DocsPage from './UseControlledValue.docs';

export default {
    title: 'hooks/useControlledValue',
    component: Example,
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = args => <Example {...args} />;

const Default = Template.bind({});

Default.parameters = {
    controls: {
        exclude: /(?:\b|')(value|onChangeText|DefaultValue)(?:\b|')/,
    },
    docs: {
        page: DocsPage,
    },
};

/**
 * should be in uncontrolled state
 */
export const Uncontrolled = Template.bind({});

Uncontrolled.parameters = {
    ...Default.parameters,
};

Uncontrolled.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('useControlledValue-input'), 'hello');

    await delay(500);

    await expect(canvas.getByDisplayValue('hello')).toBeInTheDocument();
};

/**
 *  value should be equal to defaultValue
 */
export const WithDefaultValueProp = Template.bind({});

WithDefaultValueProp.parameters = {
    ...Default.parameters,
};

WithDefaultValueProp.args = {
    defaultValue: 'default',
};

WithDefaultValueProp.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement); // because the dialog goes outside of the component

    await delay(500);

    await expect(canvas.getByDisplayValue('default')).toBeInTheDocument();
};

/**
 *  value should overwrite defaultValue
 */
export const WithDefaultPropAndValue = Template.bind({});

WithDefaultPropAndValue.parameters = {
    ...Default.parameters,
};

WithDefaultPropAndValue.args = {
    defaultValue: 'default',
    value: 'value',
};

WithDefaultPropAndValue.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    // 👇 Assert DOM structure
    await expect(canvas.getByDisplayValue('value')).toBeInTheDocument();
};

const ControlledTemplate: ComponentStory<typeof Example> = args => <ControlledExample {...args} />;

/**
 *  if onChangeText is provided but the value is undefined, should still be uncontrolled
 */
export const WithOnChangeAndValueUndefined = ControlledTemplate.bind({});

WithOnChangeAndValueUndefined.parameters = {
    ...Default.parameters,
};

WithOnChangeAndValueUndefined.args = {
    value: undefined,
};

WithOnChangeAndValueUndefined.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('useControlledValue-input'), 'hello');

    await delay(500);

    await expect(canvas.getByDisplayValue('hello')).toBeInTheDocument();
};

/**
 *  if value is not undefined, should still be controlled state but without onChange the value shouldn't change
 */
export const WithValueAndWithoutOnChange = ControlledTemplate.bind({});

WithValueAndWithoutOnChange.parameters = {
    ...Default.parameters,
};

WithValueAndWithoutOnChange.args = {
    value: 'initial',
};

WithValueAndWithoutOnChange.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('useControlledValue-input'), 'hello');

    await delay(500);

    await expect(canvas.getByDisplayValue('initial')).toBeInTheDocument();
};

/**
 *  both value and onChange is provided
 */
export const WithValueAndOnChange = ControlledTemplate.bind({});

WithValueAndOnChange.parameters = {
    ...Default.parameters,
};

WithValueAndOnChange.args = {};

WithValueAndOnChange.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    await expect(canvas.getByDisplayValue('controlledInitialValue')).toBeInTheDocument();

    await userEvent.type(canvas.getByTestId('useControlledValue-input'), ' hello');

    await delay(500);

    await expect(canvas.getByDisplayValue('controlledInitialValue hello')).toBeInTheDocument();
};

/**
 *  if disabled the value should change even if it's controlled state
 */
export const ControlledWithDisabled = ControlledTemplate.bind({});

ControlledWithDisabled.parameters = {
    ...Default.parameters,
};

ControlledWithDisabled.args = {
    disabled: true,
};

ControlledWithDisabled.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    await expect(canvas.getByDisplayValue('controlledInitialValue')).toBeInTheDocument();

    await userEvent.type(canvas.getByTestId('useControlledValue-input'), ' hello');

    await delay(500);

    await expect(canvas.getByDisplayValue('controlledInitialValue')).toBeInTheDocument();
};
