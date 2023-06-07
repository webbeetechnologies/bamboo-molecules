import { Menu, Button, Icon, MenuProps } from '../../../src/components';
import { useToggle } from '../../../src';
import { useRef } from 'react';
import { useMolecules } from '../../common';
import { StyleSheet } from 'react-native';

export type Props = MenuProps & {};

export const Example = (props: Props) => {
    const { state: isOpen, handleClose, onToggle } = useToggle();
    const { Text } = useMolecules();
    const triggerRef = useRef(null);

    return (
        <>
            <Button ref={triggerRef} onPress={onToggle}>
                Toggle
            </Button>
            <Menu
                {...props}
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
