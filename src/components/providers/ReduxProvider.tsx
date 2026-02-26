'use client';

/**
 * ReduxProvider
 *
 * Next.js App Router uses Server Components by default.
 * Redux requires client-side React context, so we need
 * this 'use client' wrapper around the Redux <Provider>.
 *
 * Import this in app/layout.tsx to wrap the entire app.
 */

import { Provider } from 'react-redux';
import store from '@/src/store';

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return <Provider store={store}>{children}</Provider>;
}
