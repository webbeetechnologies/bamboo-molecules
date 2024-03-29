import AppbarSmall from './AppbarSmall';
import AppbarCenterAligned from './AppbarCenterAligned';
import AppbarMedium from './AppbarMedium';
import AppbarLarge from './AppbarLarge';

import AppbarLeft from './AppbarLeft';
import AppbarRight from './AppbarRight';
import AppbarTitle from './AppbarTitle';
import AppbarActions from './AppbarActions';
import AppbarBase from './AppbarBase';
import type { ComponentType } from 'react';
import type { AppbarProps } from './types';

export const Appbar = Object.assign(AppbarBase as ComponentType<AppbarProps>, {
    Small: AppbarSmall,
    CenterAligned: AppbarCenterAligned,
    Medium: AppbarMedium,
    Large: AppbarLarge,

    Left: AppbarLeft,
    Right: AppbarRight,
    Title: AppbarTitle,
    Actions: AppbarActions,
});

export {
    appbarBaseStyles,
    appbarCenterAlignedStyles,
    appbarSmallStyles,
    appbarMediumStyles,
    appbarLargeStyles,
    appbarTitle,
    appbarLeft,
    appbarRight,
} from './utils';

export { AppbarProps } from './types';

export { Props as AppbarActionsProps } from './AppbarActions';
export { Props as AppbarLeftProps } from './AppbarLeft';
export { Props as AppbarRightProps } from './AppbarRight';
export { Props as AppbarTitleProps } from './AppbarTitle';
