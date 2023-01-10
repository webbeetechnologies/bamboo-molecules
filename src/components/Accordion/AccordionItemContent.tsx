import { memo } from 'react';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {};

const AccordionItemContent = memo(({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('AccordionItem_Content', style);

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
});

AccordionItemContent.displayName = 'AccordionItem.Content';

export default AccordionItemContent;
