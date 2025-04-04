import { memo, useMemo } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { accordionItemContentStyles } from './utils';

export type Props = ViewProps & {};

const AccordionItemContent = memo(({ style, children, ...rest }: Props) => {
    const componentStyles = useMemo(
        () => StyleSheet.flatten([accordionItemContentStyles.root, style]),
        [style],
    );

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
});

AccordionItemContent.displayName = 'AccordionItem_Content';

export default AccordionItemContent;
