import { View } from 'react-native';
import { ProvideComponents } from 'bamboo-molecules';

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
        <ProvideComponents>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Story />
            </View>
        </ProvideComponents>
    ),
];
