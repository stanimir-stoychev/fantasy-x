import React, { ReactNodeArray } from 'react';
import styled from 'styled-components';

type ComponentProps = {
    avatar: string;
    name: string;
    price: number;
    stats: ReactNodeArray;
};

const StyledPlayerCard = styled.div<Pick<ComponentProps, 'name' | 'price'>>`
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(62, 62, 62, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &::after {
        content: ${({ price }) => price};
    }

    .Info {
        position: relative;
    }

    .Info img {
        bottom: 0;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
    }

    .Info::before {
        content: ${({ name }) => name};
    }

    .Stats {
        display: flex;
        overflow-x: auto;
    }
`;

function PlayerCard(props: ComponentProps) {
    const { avatar, name, price, stats } = props;

    return (
        <StyledPlayerCard name={name} price={price}>
            <div className="Info">
                <img src={avatar} alt={name} />
            </div>
            <ul className="Stats">{stats}</ul>
        </StyledPlayerCard>
    );
}

export { StyledPlayerCard };
export default PlayerCard;
