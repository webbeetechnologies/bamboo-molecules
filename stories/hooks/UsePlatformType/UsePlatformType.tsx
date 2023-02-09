import { usePlatformType, useMolecules } from '../../../src';

export const Example = () => {
    const platformType = usePlatformType();
    const { Text } = useMolecules();

    return <Text>PlatformType: {platformType}</Text>;
};
