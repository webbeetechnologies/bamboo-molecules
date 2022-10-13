import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {};

const ComponentTemplate = ({ style, ...rest }: Props) => {
    const { View, Text } = useMolecules();
    const componentStyles = useComponentStyles('View', style); // all the styling logics goes here

    return (
        <View style={componentStyles} {...rest}>
            <Text>Component Template</Text>
        </View>
    );
};

export default ComponentTemplate;
