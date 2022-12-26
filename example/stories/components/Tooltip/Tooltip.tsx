import { useMolecules, TooltipProps } from 'bamboo-molecules';

export const Example = (props: TooltipProps) => {
    const { Tooltip, Text, IconButton } = useMolecules();

    return (
        <Tooltip {...props}>
            <Tooltip.Trigger>
                <IconButton name="star-outline" />
            </Tooltip.Trigger>
            <Tooltip.Content>
                <Text>mark as favorite</Text>
            </Tooltip.Content>
        </Tooltip>
    );
};
