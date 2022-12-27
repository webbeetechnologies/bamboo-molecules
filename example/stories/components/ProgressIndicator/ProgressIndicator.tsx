import {
    useMolecules,
    CircularProgressIndicatorProps,
    LinearProgressIndicatorProps,
} from 'bamboo-molecules';

export const CircularExample = (props: CircularProgressIndicatorProps) => {
    const { ProgressIndicator } = useMolecules();

    return <ProgressIndicator.Circular {...props} />;
};

export const LinearExample = (props: LinearProgressIndicatorProps) => {
    const { ProgressIndicator } = useMolecules();

    return <ProgressIndicator.Linear {...props} />;
};
