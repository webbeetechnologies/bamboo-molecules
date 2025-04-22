import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import ActivityIndicatorDefault from './ActivityIndicator';

registerMoleculesComponents({
    ActivityIndicator: ActivityIndicatorDefault,
});

export const ActivityIndicator = getRegisteredComponentWithFallback(
    'ActivityIndicator',
    ActivityIndicatorDefault,
);

export {
    Props as ActivityIndicatorProps,
    activityIndicatorStylesDefault,
    activityIndicatorStyles,
} from './ActivityIndicator';
