import { useMolecules, useComponentStyles, ViewProps } from 'bamboo-molecules';

export type Props = ViewProps & {};

const Container = (props: Props) => {
    const { View, Surface } = useMolecules();
    const { ...containerStyles } = useComponentStyles('CalcWrapper');

    // console.log('con', containerStyles);

    return (
        <Surface elevation={4}>
            <View style={containerStyles} {...props} />
        </Surface>
    );
};

export default Container;
