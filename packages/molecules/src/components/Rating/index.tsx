import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import RatingDefault from './Rating';

registerMoleculesComponents({
    Rating: RatingDefault,
});

export const Rating = getRegisteredComponentWithFallback('Rating', RatingDefault);

export { ratingStyles, ratingItemStyles } from './utils';
export { States } from './utils';
