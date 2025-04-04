import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import RatingDefault from './Rating';

registerMoleculesComponents({
    Rating: RatingDefault,
});

export const Rating = getRegisteredMoleculesComponent('Rating');

export { ratingStyles, ratingItemStyles } from './utils';
export { States } from './utils';
