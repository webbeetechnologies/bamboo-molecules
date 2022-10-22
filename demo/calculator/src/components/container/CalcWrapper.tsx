import { useMolecules, useComponentStyles, ViewProps } from 'bamboo-molecules';

export type Props = ViewProps & {};

const CalcWrapper = ({ style, ...props }: Props) => {
    const { View, Surface } = useMolecules();
    const { ...containerStyles } = useComponentStyles('CalcWrapper', style);

    // console.log('con', containerStyles);

    return (
        <Surface elevation={4}>
            <View style={containerStyles} {...props} />
        </Surface>
    );
};

export default CalcWrapper;
