import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import pets from './pets.json';
import Pet from './Pet';

interface Props {
    children: React.ReactElement;
}

const Grid = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;

    .Pet {
        margin: 20px;
    }
`;

function HideOnScroll(props: Props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function App() {
    return (
        <>
            <CssBaseline />
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">Pet shop</Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Grid>
                {pets.map((pet) => (
                    <Pet key={pet.id} pet={pet} />
                ))}
            </Grid>
        </>
    );
}

export default App;
