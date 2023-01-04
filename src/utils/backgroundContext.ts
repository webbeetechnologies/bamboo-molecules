import { createContext } from 'react';

export const BackgroundContext = createContext<{ backgroundColor: string | undefined }>({
    backgroundColor: undefined,
});
