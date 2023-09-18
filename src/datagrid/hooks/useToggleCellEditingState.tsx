import {
    CELL_FOCUS_PLUGIN_KEY,
    useCellFocusMethods,
    usePluginsDataValueSelector,
} from '../plugins';
import { useField, useFieldType } from '../contexts';
import { useShortcut } from '@bambooapp/bamboo-molecules/shortcuts-manager';

const useToggleCellEditingState = () => {
    const { focusedCell } = usePluginsDataValueSelector(store => ({
        focusedCell: store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell,
    }));
    const { type } = useField(focusedCell?.columnId) || {};

    const { toggleRenderersWithEnterKey } = useFieldType(type) || {};
    const { useSetFocusCellPluginStore } = useCellFocusMethods();
    const setFocusCellPluginStore = useSetFocusCellPluginStore();

    useShortcut(
        'edit-cell',
        () => {
            if (!toggleRenderersWithEnterKey) return;

            setFocusCellPluginStore((prev: { isEditing: boolean }) => ({
                isEditing: !prev.isEditing,
            }));
        },
        !focusedCell,
    );
};

export default useToggleCellEditingState;
