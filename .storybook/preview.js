import { View } from 'react-native';
import { mockDateDecorator } from 'storybook-mock-date-decorator';
import isChromatic from 'chromatic/isChromatic';

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
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Story />
        </View>
    ),
    isChromatic() ? mockDateDecorator : Story => <Story />,
];
