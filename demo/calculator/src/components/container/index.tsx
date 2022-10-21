import { useMolecules, useComponentStyles, ViewProps } from 'bamboo-molecules';

export type Props = ViewProps & {};

const Container = (props: Props) => {
    const { View } = useMolecules();
    const { ...containerStyles } = useComponentStyles('Container');

    return <View style={containerStyles} {...props} />;
};

export default Container;
