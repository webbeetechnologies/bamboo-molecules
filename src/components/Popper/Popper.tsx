import { useComponentStyles, useMolecules } from '../../hooks';
import type { PopperProps } from './types';


const Popper = ({ style, ...rest }: PopperProps) => {
    const { View, Text } = useMolecules();
    const componentStyles = useComponentStyles('View', style); // all the styling logics goes here

    return (
        <View style={componentStyles} {...rest}>
            <Text>Component Template</Text>
        </View>
    );
};

export default Popper;
