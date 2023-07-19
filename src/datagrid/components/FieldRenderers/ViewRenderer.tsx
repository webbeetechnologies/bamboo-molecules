import createFieldRenderer from './createFieldRenderer';
import type { ComponentProps } from 'react';

const ViewRenderer = createFieldRenderer({ type: 'ValueRenderer' });

export type ViewRendererProps = ComponentProps<typeof ViewRenderer>;

export default ViewRenderer;
