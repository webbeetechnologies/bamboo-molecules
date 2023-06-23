import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Menu';

export default {
    title: 'components/Menu',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
import { useToggle, useMolecules } from '@bambooapp/bamboo-molecules';
            
export const Example = () => {
    const { state: isOpen, handleClose, onToggle } = useToggle();
    const { Text, Menu, Icon, Button } = useMolecules();
    const triggerRef = useRef(null);

    return (
        <>
            <Button ref={triggerRef} onPress={onToggle}>
                Toggle
            </Button>
            <Menu
                style={styles.menu}
                isOpen={isOpen}
                onClose={handleClose}
                triggerRef={triggerRef}>
                <Menu.Item left={<Icon name="content-cut" size={22} />} right={<Text>⌘X</Text>}>
                    Cut
                </Menu.Item>
                <Menu.Item left={<Icon name="content-copy" size={22} />} right={<Text>⌘C</Text>}>
                    Copy
                </Menu.Item>
                <Menu.Item left={<Icon name="content-paste" size={22} />} right={<Text>⌘V</Text>}>
                    Paste
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item left={<Icon name="cloud" size={22} />}>Web Clipboard</Menu.Item>
            </Menu>
        </>
    );
};

const styles = StyleSheet.create({
    menu: {
        width: 280,
    },
});
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
