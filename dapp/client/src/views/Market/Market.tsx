import React from 'react';

import { ComponentProps } from './types';
import { StyledMarket } from './styled';
import usePlayers from './hooks/usePlayers';

function Market(props: ComponentProps) {
    const { data, isLoading } = usePlayers();

    console.log({ data, isLoading });

    return <StyledMarket>...</StyledMarket>;
}

export { StyledMarket };
export default Market;
