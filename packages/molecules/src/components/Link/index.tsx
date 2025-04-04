import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import LinkDefault from './Link';

registerMoleculesComponents({
    Link: LinkDefault,
});

export const Link = getRegisteredMoleculesComponent('Link');

export { linkStyles } from './utils';
