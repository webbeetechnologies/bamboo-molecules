import { useMolecules, SurfaceProps } from 'bamboo-molecules';

export type Props = SurfaceProps & {};

export const Example = (props: Props) => {
    const { Surface, Text } = useMolecules();

    return (
        <Surface style={{ width: 100, height: 100, backgroundColor: '#f1f1f1' }} {...props}>
            <Text>Surface</Text>
        </Surface>
    );
};
