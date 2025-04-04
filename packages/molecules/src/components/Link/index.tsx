import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import LinkDefault from './Link';

registerMoleculesComponents({
    Link: LinkDefault,
});

export const Link = getRegisteredComponentWithFallback('Link', LinkDefault);

export { Props as LinkProps } from './Link';
export { linkStyles } from './utils';
