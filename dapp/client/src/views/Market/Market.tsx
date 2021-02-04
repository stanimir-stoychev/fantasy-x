import React from 'react';

import PlayerCard from 'shared/components/PlayerCard';

import { ComponentProps } from './types';
import { StyledMarket } from './styled';
import usePlayers from './hooks/usePlayers';

function Market(props: ComponentProps) {
    const { data = [], isLoading } = usePlayers();

    console.log({ data, isLoading });

    return (
        <StyledMarket>
            {data.map((player) => (
                <PlayerCard
                    key={player.name}
                    avatar={player.avatar}
                    name={player.name}
                    price={player.price}
                    stats={[]}
                />
            ))}
        </StyledMarket>
    );
}

export { StyledMarket };
export default Market;
