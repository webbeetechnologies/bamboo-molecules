import type { Shortcut } from '@bambooapp/bamboo-molecules/shortcuts-manager';
import { isMac } from '@bambooapp/bamboo-molecules';

export const shortcuts: Shortcut[] = [
    {
        name: 'move-cell-focus',
        keys: [
            ['ArrowLeft'],
            ['ArrowRight'],
            ['ArrowUp'],
            ['ArrowDown'],
            ['Tab'],
            ['Shift', 'Tab'],
            isMac() ? ['meta', 'ArrowLeft'] : ['control', 'ArrowLeft'],
            isMac() ? ['meta', 'ArrowRight'] : ['control', 'ArrowRight'],
            isMac() ? ['meta', 'ArrowUp'] : ['control', 'ArrowUp'],
            isMac() ? ['meta', 'ArrowDown'] : ['control', 'ArrowDown'],
        ],
        scope: 'datagrid',
    },
    {
        name: 'clear-cell-focus',
        keys: [['Escape']],
        scope: 'datagrid',
    },
];
