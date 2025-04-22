import { memo } from 'react';
import { popoverFactory } from '../Popover';
import { defaultStyles } from './utils';

export default memo(popoverFactory(defaultStyles));
