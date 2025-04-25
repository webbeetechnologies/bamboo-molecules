import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import { default as CardComponent } from './Card';
import { default as CardHeader } from './CardHeader';
import { default as CardContent } from './CardContent';
import { default as CardMedia } from './CardMedia';
import { default as CardHeadline } from './CardHeadline';
import { default as CardSubhead } from './CardSubhead';
import { default as CardText } from './CardText';
import { default as CardActions } from './CardActions';
export const CardDefault = Object.assign(
    // @component ./Checkbox.tsx
    CardComponent,
    {
        Header: CardHeader,
        Content: CardContent,
        Media: CardMedia,
        Headline: CardHeadline,
        Subhead: CardSubhead,
        Text: CardText,
        Actions: CardActions,
    },
);

registerMoleculesComponents({
    Card: CardDefault,
});

export const Card = getRegisteredComponentWithFallback('Card', CardDefault);

export { Props as CardProps, cardStyles } from './Card';
export { Props as CardHeaderProps, cardHeaderStyles } from './CardHeader';
export { Props as CardContentProps, cardContentStyles } from './CardContent';
export { Props as CardMediaProps, cardMediaStyles } from './CardMedia';
export { Props as CardTextProps, cardTypograhyStyles } from './CardTypography';
export { Props as CardActionsProps } from './CardActions';
export { cardActionsStyles } from './utils';
export { CardTypographyVariant } from './utils';
export { CardTypographySize } from './utils';
