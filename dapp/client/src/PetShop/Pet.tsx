import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useSolidityContract from '../shared/hooks/useSolidityContract';

type ComponentProps = {
    pet: {
        id: number;
        name: string;
        picture: string;
        age: number;
        breed: string;
        location: string;
    };
};

const StyledMedia = styled(CardMedia)`
    height: 140px;
`;

const StyledCard = styled(Card)`
    width: 345px;
`;

function Pet({ pet }: ComponentProps) {
    const { id: petId } = pet;
    const { account, contract } = useSolidityContract('Adoption');
    const [adopted, setAdopted] = useState(false);
    const handleAdopt = () => {
        contract.methods
            .adopt(petId)
            .send({ from: account })
            .then(() => contract.methods.getAdopters.call())
            .then((adopters: string[]) => {
                for (let i = 0; i < adopters.length; i += 1) {
                    if (adopters[i] !== '0x0000000000000000000000000000000000000000' && i === petId) {
                        setAdopted(true);
                        break;
                    }
                }
            });
    };

    return (
        <StyledCard className="Pet">
            <CardActionArea>
                <StyledMedia image={pet.picture} title="Contemplative Reptile" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {pet.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`${pet.age} years old `}
                        <strong>{pet.breed}</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" disabled={adopted} onClick={handleAdopt}>
                    Adopt
                </Button>
            </CardActions>
        </StyledCard>
    );
}

export default Pet;
