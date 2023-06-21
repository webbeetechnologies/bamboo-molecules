import createFieldRenderer from './createFieldRenderer';
import type { ComponentProps } from 'react';

const ViewRenderer = createFieldRenderer({ type: 'ViewRenderer' });

export type ViewRendererProps = ComponentProps<typeof ViewRenderer>;

export default ViewRenderer;
