import { useMolecules } from '../../../src';
import { TouchableRipple, TouchableRippleProps } from '../../../src/components';

export type Props = TouchableRippleProps & {};

export const Example = (props: Props) => {
    const { Text } = useMolecules();

    return (
        <TouchableRipple
            style={{ width: 200, height: 100, backgroundColor: '#f1f1f1' }}
            onPress={() => {}}
            {...props}>
            <Text>Touchable Ripple</Text>
        </TouchableRipple>
    );
};
