import { getRegisteredComponentWithFallback } from '../../core';
import DialogComponent from './Dialog';
import DialogActions from './DialogActions';
import DialogContent from './DialogContent';
import DialogTitle from './DialogTitle';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Dialog = Object.assign(getRegisteredComponentWithFallback('Dialog', DialogComponent), {
    // @component ./DialogContent.tsx
    Content: DialogContent,
    // @component ./DialogActions.tsx
    Actions: DialogActions,
    // @component ./DialogTitle.tsx
    Title: DialogTitle,
});

export type { Props as DialogProps } from './Dialog';
export type { Props as DialogActionsProps } from './DialogActions';
export type { Props as DialogContentProps } from './DialogContent';
export type { Props as DialogTitleProps } from './DialogTitle';
export {
    dialogActionsStyles,
    dialogContentStyles,
    dialogIconStyles,
    dialogScrollAreaStyles,
    dialogStyles,
    dialogTitleStyles,
} from './utils';
