import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import AvatarDefault from './Avatar';

registerMoleculesComponents({
    Avatar: AvatarDefault,
});

export const Avatar = getRegisteredMoleculesComponent('Avatar');

export { avatarStyles } from './utils';
