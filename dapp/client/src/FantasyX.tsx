import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Market from './views/Market';

const queryClient = new QueryClient();

function FantasyX() {
    return (
        <QueryClientProvider client={queryClient}>
            <Market />
        </QueryClientProvider>
    );
}

export default FantasyX;
