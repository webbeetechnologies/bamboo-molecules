import { useMolecules } from '../../../src';
import { Surface, SurfaceProps } from '../../../src/components';

export type Props = SurfaceProps & {};

export const Example = (props: Props) => {
    const { Text } = useMolecules();

    return (
        <Surface style={{ width: 100, height: 100, backgroundColor: '#f1f1f1' }} {...props}>
            <Text>Surface</Text>
        </Surface>
    );
};
