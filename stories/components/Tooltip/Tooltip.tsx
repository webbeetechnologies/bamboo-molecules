import { Tooltip, IconButton, TooltipProps } from '../../../src/components';

export const Example = (props: TooltipProps) => {
    return (
        <Tooltip {...props}>
            <Tooltip.Trigger>
                <IconButton name="star-outline" />
            </Tooltip.Trigger>
            <Tooltip.Content>mark as favorite</Tooltip.Content>
        </Tooltip>
    );
};
