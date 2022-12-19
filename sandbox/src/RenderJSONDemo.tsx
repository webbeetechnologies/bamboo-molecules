import * as React from 'react';

export const RenderJSON = (props: { json: Object }) => {
    return (
        <pre
            style={{
                width: 500,
                maxWidth: '100%',
                flex: 10,
                flexBasis: 100,
                background: '#f5f5f5',
                border: '1px solid #eee',
                borderRadius: '4px',
                padding: 8,
            }}>
            {JSON.stringify(props.json, null, 4)}
        </pre>
    );
};
