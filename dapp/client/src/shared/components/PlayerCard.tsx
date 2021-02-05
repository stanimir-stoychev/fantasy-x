import React, { ReactNodeArray } from 'react';
import styled from 'styled-components';

type ComponentProps = {
    avatar: string;
    name: string;
    price: number;
    stats: ReactNodeArray;
};

const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
function populate(a: string) {
    let res = a;
    for (let i = 0; i < 6; i += 1) {
        const x = Math.round(Math.random() * 14);
        const y = hexValues[x];
        res += y;
    }
    return res;
}

function generateGradient() {
    const newColor1 = populate('#');
    const newColor2 = populate('#');
    const angle = Math.round(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${newColor1}, ${newColor2})`;
}

const StyledPlayerCard = styled.div<Pick<ComponentProps, 'name' | 'price'> & { background: string }>`
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(62, 62, 62, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 300px;
    width: 300px;
    margin: 10px;

    &::after {
        content: '${({ price }) => price}';
    }

    .Info {
        height: 75%;
        position: relative;
    }

    .Info img {
        border-radius: 5px 5px 0 0;
        bottom: 0;
        left: 50%;
        opacity: 0.9;
        position: absolute;
        transform: translateX(-50%);
        z-index: 1;
    }

    .Info::before {
        content: '';
        background: ${({ background }) => background};
        height: 100%;
        left: 0;
        opacity: 0.5;
        position: absolute;
        top: 0;
        width: 100%;
    }

    .Info::after {
        content: '${({ name }) => name}';
        left: 50%;
        opacity: 0.75;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 10rem;
    }

    .Stats {
        display: flex;
        overflow-x: auto;
        padding-left: 20px;
    }
`;

function PlayerCard(props: ComponentProps) {
    const { avatar, name, price, stats } = props;

    return (
        <StyledPlayerCard background={generateGradient()} name={name} price={price}>
            <div className="Info">
                <img src={avatar} alt={name} />
            </div>
            <ul className="Stats">{stats}</ul>
        </StyledPlayerCard>
    );
}

export { StyledPlayerCard };
export default PlayerCard;
