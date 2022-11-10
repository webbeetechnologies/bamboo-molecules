import { useMolecules, ActivityIndicatorProps } from 'bamboo-molecules';

export type Props = ActivityIndicatorProps & {};

export const Example = (props: Props) => {
    const { ActivityIndicator } = useMolecules();

    return <ActivityIndicator {...props} />;
};
