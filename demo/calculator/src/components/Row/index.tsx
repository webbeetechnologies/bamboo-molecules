import { useComponentStyles, useMolecules, ViewProps } from 'bamboo-molecules';

const Row = ({ style, children, ...rest }: ViewProps) => {
    const { View } = useMolecules();
    const { ...rowStyles } = useComponentStyles('Row', style);
    return (
        <View style={rowStyles} {...rest}>
            {children}
        </View>
    );
};

export default Row;
