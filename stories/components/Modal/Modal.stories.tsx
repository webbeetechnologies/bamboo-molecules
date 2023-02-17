import { useCallback } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/addons';

import { Button } from '../../../src/components/Button';

import { Example } from './Modal';

export default {
    title: 'components/Modal',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => {
    const [_, updateArgs] = useArgs();

    const onOpen = useCallback(() => {
        updateArgs({ ...args, isOpen: true });
    }, [args, updateArgs]);

    const onClose = useCallback(() => {
        updateArgs({ ...args, isOpen: false });
    }, [args, updateArgs]);

    return (
        <>
            <Button onPress={onOpen}>Show Modal</Button>
            <Example {...args} onClose={onClose} />
        </>
    );
};

Default.args = {
    isOpen: true,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<ActivityIndicator color="colors.primary" size={30} animating {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
    chromatic: { disableSnapshot: true },
};
