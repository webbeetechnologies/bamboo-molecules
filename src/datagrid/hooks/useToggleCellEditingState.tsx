import {
    CELL_FOCUS_PLUGIN_KEY,
    useCellFocusMethods,
    usePluginsDataStoreRef,
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

    const { toggleRenderersWithKeyPress } = useFieldType(type) || {};
    const { useSetFocusCellPluginStore, useSetFocusCellByDirection } = useCellFocusMethods();

    const setFocusCellPluginStore = useSetFocusCellPluginStore();
    const setFocusCellByDirection = useSetFocusCellByDirection();
    const { store: pluginsDataStore } = usePluginsDataStoreRef();

    const { canTriggerCellStartEditing } = usePluginsDataValueSelector(store => ({
        canTriggerCellStartEditing:
            !store[CELL_FOCUS_PLUGIN_KEY]?.isEditing && store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell,
    }));

    useShortcut(
        'edit-cell',
        () => {
            if (!toggleRenderersWithKeyPress) return;

            // so that setting isEditing doesn't affect the if statement below
            const isEditing = pluginsDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.isEditing;

            setFocusCellPluginStore((prev: { isEditing: boolean }) => ({
                isEditing: !prev.isEditing,
            }));

            if (isEditing) {
                setFocusCellByDirection('down');
            }
        },
        !rowId || !columnId,
    );

    useShortcut(
        'cell-start-editing',
        ({ key }) => {
            if (!toggleRenderersWithKeyPress) return;

            setFocusCellPluginStore(() => ({
                isEditing: true,
                pressedKey: key,
            }));
        },
        !canTriggerCellStartEditing,
    );
};

export default useToggleCellEditingState;
