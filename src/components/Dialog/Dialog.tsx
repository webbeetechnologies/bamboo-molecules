import { memo, ReactNode, Children, isValidElement, cloneElement, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { ModalProps } from '../Modal';
import type { IconProps } from '../Icon';
import DialogIcon from './DialogIcon';

export type Props = ModalProps & {
    /**
     * Callback that is called when the user dismisses the dialog.
     */
    onClose?: () => void;
    /**
     * Determines Whether the dialog is visible.
     */
    isOpen: boolean;
    /**
     * Content of the `Dialog`.
     */
    children: ReactNode;
    iconProps?: IconProps;
    style?: StyleProp<ViewStyle>;
};

const Dialog = ({ children, onClose, iconProps, style = {}, ...rest }: Props) => {
    const { Modal } = useMolecules();
    const componentStyles = useComponentStyles('Dialog', style);

    const { containerStyle, childStyle } = useMemo(() => {
        const { spacing, ...restStyle } = componentStyles;

        return {
            childStyle: {
                marginTop: spacing,
            },
            containerStyle: restStyle,
        };
    }, [componentStyles]);

    const dialogChildren = useMemo(
        () =>
            Children.toArray(children)
                .filter(child => child != null && typeof child !== 'boolean')
                .map((child, i) => {
                    if (i === 0 && isValidElement(child) && !iconProps) {
                        return cloneElement(child, {
                            style: [childStyle, child.props.style],
                        });
                    }
                    return child;
                }),
        [childStyle, children, iconProps],
    );

    return (
        <Modal elevation={2} {...rest} onClose={onClose} style={containerStyle}>
            <>
                {iconProps ? <DialogIcon {...iconProps} /> : null}
                {dialogChildren}
            </>
        </Modal>
    );
};

export default memo(Dialog);
