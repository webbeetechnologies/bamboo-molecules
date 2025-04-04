import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import ActivityIndicatorDefault from './ActivityIndicator';

registerMoleculesComponents({
    ActivityIndicator: ActivityIndicatorDefault,
});

export const ActivityIndicator = (getRegisteredMoleculesComponent('ActivityIndicator') ??
    ActivityIndicatorDefault) as typeof ActivityIndicatorDefault;

export {
    Props as ActivityIndicatorProps,
    defaultStyles as activityIndicatorStyles,
} from './ActivityIndicator';
