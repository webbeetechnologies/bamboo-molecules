import { forwardRef, memo } from 'react';
import type { RenderCellProps } from '../../../components';

export type Props = Omit<RenderCellProps, 'ref'>;

const GroupFooterRenderer = (props: Props) => {
    return <>Group Footer</>;
};

export default memo(forwardRef(GroupFooterRenderer));
