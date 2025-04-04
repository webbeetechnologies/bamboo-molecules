import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import ModalDefault from './Modal';

registerMoleculesComponents({
    Modal: ModalDefault,
});

export const Modal = getRegisteredMoleculesComponent('Modal');

export { modalStyles } from './utils';
