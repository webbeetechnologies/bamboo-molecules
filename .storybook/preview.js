import { View } from 'react-native';
import { mockDateDecorator } from 'storybook-mock-date-decorator';
import isChromatic from 'chromatic/isChromatic';
import '../src/unistyles'
import { ProvideMolecules } from '../src/core'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    Story => (
        <ProvideMolecules>
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Story />
        </View>
        </ProvideMolecules>
    ),
    isChromatic() ? mockDateDecorator : Story => <Story />,
];
export const tags = ['autodocs'];
