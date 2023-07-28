import { forwardRef, memo } from 'react';
import type { RenderCellProps } from '../../../components';

export type Props = Omit<RenderCellProps, 'ref'>;

const GroupHeaderRenderer = (props: Props, ref) => {
    return <>Group Header</>;
};

export default memo(forwardRef(GroupHeaderRenderer));
