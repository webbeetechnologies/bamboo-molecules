import { View } from 'react-native';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

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
    mockDateDecorator,
];
