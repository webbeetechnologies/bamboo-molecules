import { ProvideMolecules, useMolecules } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text } = useMolecules();

    return (
        <View>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta ea eius expedita
                nobis placeat quod, recusandae voluptatibus. Aperiam asperiores enim fugiat ipsam
            </Text>
        </View>
    );
};

export const Example = () => {
    return (
        <ProvideMolecules>
            <Components />
        </ProvideMolecules>
    );
};
