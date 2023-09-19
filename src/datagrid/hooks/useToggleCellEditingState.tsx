import {
    CELL_FOCUS_PLUGIN_KEY,
    useCellFocusMethods,
    usePluginsDataValueSelector,
} from '../plugins';
import { useField, useFieldType } from '../contexts';
import { useShortcut } from '@bambooapp/bamboo-molecules/shortcuts-manager';

const useToggleCellEditingState = () => {
    const { columnId, rowId } = usePluginsDataValueSelector(store => ({
        columnId: store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell?.columnId,
        rowId: store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell?.rowId,
    }));
    const { type } = useField(columnId) || {};

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
        !rowId || !columnId,
    );
};

export default useToggleCellEditingState;
