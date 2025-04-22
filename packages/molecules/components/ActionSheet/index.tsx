import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import ActionSheetDefault from './ActionSheet';

registerMoleculesComponents({
    ActionSheet: ActionSheetDefault,
});

export const ActionSheet = getRegisteredComponentWithFallback('ActionSheet', ActionSheetDefault);

export {
    useScrollHandlers as useActionSheetScrollHandlers,
    SheetProvider as ActionSheetProvider,
    registerSheet as registerActionSheet,
    SheetProps as ActionSheetManagerSheetProps,
    SheetManager as ActionSheetManager,
    ActionSheetRef,
} from 'react-native-actions-sheet';
export type { Props as ActionSheetProps, IActionSheet } from './ActionSheet';
export { actionSheetStyles } from './utils';
