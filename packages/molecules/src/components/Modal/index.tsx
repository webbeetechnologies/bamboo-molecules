import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import ModalDefault from './Modal';

registerMoleculesComponents({
    Modal: ModalDefault,
});

export const Modal = getRegisteredComponentWithFallback('Modal', ModalDefault);

export { Props as ModalProps } from './Modal';
export { modalStyles } from './utils';
