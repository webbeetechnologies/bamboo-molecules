import { View } from 'react-native';
import { ProvideComponents } from 'bamboo-molecules';

export const decorators = [
    Story => (
        <ProvideComponents>
            <Story />
        </ProvideComponents>
    ),
];
export const parameters = {};
