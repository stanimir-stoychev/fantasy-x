import React, { ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';

type ComponentProps = {
    avatar: string;
    name: string;
    price: number;
    stats: ReactNodeArray;
    actions?: ReactNode | (() => ReactNode);
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
    min-height: 300px;
    width: 300px;
    position: relative;

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
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }

    .Stats {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: center;
        margin: 0;
        overflow-x: auto;
        padding: 0;
    }

    .PriceTag {
        display: inline-block;

        width: auto;
        height: 38px;

        background-color: #6ab070;
        border-radius: 3px 4px 4px 3px;

        border-left: 1px solid #6ab070;

        /* This makes room for the triangle */
        margin-left: 19px;

        position: relative;

        color: white;
        font-weight: 300;
        font-size: 22px;
        line-height: 38px;

        padding: 0 10px 0 10px;
    }

    /* Makes the triangle */
    .PriceTag::before {
        content: '';
        position: absolute;
        display: block;
        left: -19px;
        width: 0;
        height: 0;
        border-top: 19px solid transparent;
        border-bottom: 19px solid transparent;
        border-right: 19px solid #6ab070;
    }

    /* Makes the circle */
    .PriceTag::after {
        content: '';
        background-color: white;
        border-radius: 50%;
        width: 4px;
        height: 4px;
        display: block;
        position: absolute;
        left: -9px;
        top: 17px;
    }
`;

function PlayerCard(props: ComponentProps) {
    const { avatar, name, price, stats } = props;

    return (
        <StyledPlayerCard background={generateGradient()} name={name} price={price} className="PlayerCard">
            <div className="Info">
                <img src={avatar} alt={typeof name === 'string' ? name : ''} />
            </div>
            <ul className="Stats">{stats}</ul>
        </StyledPlayerCard>
    );
}

export { StyledPlayerCard };
export default PlayerCard;
