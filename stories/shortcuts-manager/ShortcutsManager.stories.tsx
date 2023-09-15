import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './ShortcutsManager';
import DocsPage from './ShortcutsManager.docs';
import { View } from 'react-native';

export default {
    title: 'ShortcutsManager/shortcuts-manager',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => (
    <View>
        <Example id="item-1" />
        <Example id="item-2" />
    </View>
);

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
