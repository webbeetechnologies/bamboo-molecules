import DialogComponent from './Dialog';
import DialogActions from './DialogActions';
import DialogContent from './DialogContent';
import DialogIcon from './DialogIcon';
import DialogScrollArea from './DialogScrollArea';
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
        // @component ./DialogScrollArea.tsx
        ScrollArea: DialogScrollArea,
        // @component ./DialogIcon.tsx
        Icon: DialogIcon,
    },
);

export { Props as DialogProps } from './Dialog';
export { Props as DialogActionsProps } from './DialogActions';
export { Props as DialogContentProps } from './DialogContent';
export { Props as DialogIconProps } from './DialogIcon';
export { Props as DialogScrollAreaProps } from './DialogScrollArea';
export { Props as DialogTitleProps } from './DialogTitle';

export {
    dialogStyles,
    dialogActionsStyles,
    dialogContentStyles,
    dialogIconStyles,
    dialogTitleStyles,
    dialogScrollAreaStyles,
} from './utils';
