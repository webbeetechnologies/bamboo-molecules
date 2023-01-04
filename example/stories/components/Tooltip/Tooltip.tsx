import { useMolecules, TooltipProps } from 'bamboo-molecules';

export const Example = (props: TooltipProps) => {
    const { Tooltip, IconButton } = useMolecules();

    return (
        <Tooltip {...props}>
            <Tooltip.Trigger>
                <IconButton name="star-outline" />
            </Tooltip.Trigger>
            <Tooltip.Content>mark as favorite</Tooltip.Content>
        </Tooltip>
    );
};
