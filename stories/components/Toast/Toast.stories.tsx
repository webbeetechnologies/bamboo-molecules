import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Toast';

export default {
    title: 'components/Toast',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
import { useMolecules, Toast, ProvideMolecules, ToastContainer } from '@bambooapp/bamboo-molecules';

const toastConfig = {
  // you can add custom toasts here
};

const App = () => {
  
    return (
        <ProvideMolecules>
            <Example />
             {/* This can also be used with useMolecules */}
            <ToastContainer config={toastConfig} />
        </ProvideMolecules>
    )
}

export const Example = () => {
    const { Button } = useMolecules();
    
    const onPressAction = useCallback(() => {}, []);

    const showToast = useCallback(() => {
        Toast.show({
            text1: "Hi, I'm a Toast with action button",
            position: 'bottom',
            visibilityTime: 2000,
            props: {
                actionButtonLabel: 'Action',
                displayActionButton: true,
                displayCloseButton: true,
                onPressAction,
            },
        });
    }, [props]);

    return <Button onPress={showToast}>Show Toast</Button>;
};

`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
