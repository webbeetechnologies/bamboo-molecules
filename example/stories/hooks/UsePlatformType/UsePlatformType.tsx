import { ProvideMolecules, usePlatformType, useMolecules } from 'bamboo-molecules';

export const Example = () => {
    const platformType = usePlatformType();
    const { Text } = useMolecules();

    return <Text>PlatformType: {platformType}</Text>;
};

export const App = () => {
    return (
        <ProvideMolecules>
            <Example />
        </ProvideMolecules>
    );
};
