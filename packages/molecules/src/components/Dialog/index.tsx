import DialogComponent from './Dialog';
import DialogActions from './DialogActions';
import DialogContent from './DialogContent';
import DialogTitle from './DialogTitle';

export const Dialog = Object.assign(
    // @component ./Checkbox.tsx
    DialogComponent,
    {
        // @component ./DialogContent.tsx
        Content: DialogContent,
        // @component ./DialogActions.tsx
        Actions: DialogActions,
        // @component ./DialogTitle.tsx
        Title: DialogTitle,
    },
);

export { Props as DialogProps } from './Dialog';
export { Props as DialogActionsProps } from './DialogActions';
export { Props as DialogContentProps } from './DialogContent';
export { Props as DialogTitleProps } from './DialogTitle';

export {
    dialogStyles,
    dialogActionsStyles,
    dialogContentStyles,
    dialogIconStyles,
    dialogTitleStyles,
} from './utils';
