import { useComponentStyles, useMolecules } from '../../hooks';
import type { TemplateComponentProps } from './types';


const TemplateComponent = ({ style, ...rest }: TemplateComponentProps) => {
    const { View, Text } = useMolecules();
    const componentStyles = useComponentStyles('View', style); // all the styling logics goes here

    return (
        <View style={componentStyles} {...rest}>
            <Text>Component Template</Text>
        </View>
    );
};

export default TemplateComponent;
