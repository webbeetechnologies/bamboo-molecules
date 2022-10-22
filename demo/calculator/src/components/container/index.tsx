import { useMolecules, useComponentStyles, ViewProps } from 'bamboo-molecules';

export type Props = ViewProps & {};

const Container = ({ style, ...props }: Props) => {
    const { View } = useMolecules();
    const { ...containerStyles } = useComponentStyles('Container', style);

    return <View style={containerStyles} {...props} />;
};

export default Container;
