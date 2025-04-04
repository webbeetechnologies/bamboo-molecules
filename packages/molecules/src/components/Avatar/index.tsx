import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import AvatarDefault from './Avatar';

registerMoleculesComponents({
    Avatar: AvatarDefault,
});

export const Avatar = getRegisteredComponentWithFallback('Avatar', AvatarDefault);

export { avatarStyles } from './utils';
