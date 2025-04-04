import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import ModalDefault from './Modal';

registerMoleculesComponents({
    Modal: ModalDefault,
});

export const Modal = getRegisteredComponentWithFallback('Modal', ModalDefault);

export { modalStyles } from './utils';
