import { default as CardComponent } from './Card';
import { default as CardHeader } from './CardHeader';
import { default as CardContent } from './CardContent';
import { default as CardMedia } from './CardMedia';
import { default as CardText } from './CardText';
import { default as CardActions } from './CardActions';

export const Card = Object.assign(
    // @component ./Checkbox.tsx
    CardComponent,
    {
        Header: CardHeader,
        Content: CardContent,
        Media: CardMedia,
        Text: CardText,
        Actions: CardActions,
    },
);

export { Props as CardProps } from './Card';
export { Props as CardHeaderProps } from './CardHeader';
export { Props as CardContentProps } from './CardContent';
export { Props as CardMediaProps } from './CardMedia';
export { Props as CardTextProps } from './CardText';
export { Props as CardActionsProps } from './CardActions';
export {
    cardStyles,
    cardHeaderStyles,
    cardContentStyles,
    cardMediaStyles,
    cardTextStyles,
    cardActionsStyles,
} from './utils';
