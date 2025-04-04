import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import AvatarDefault from './Avatar';

registerMoleculesComponents({
    Avatar: AvatarDefault,
});

export const Avatar = getRegisteredComponentWithFallback('Avatar');

export { avatarStyles } from './utils';
