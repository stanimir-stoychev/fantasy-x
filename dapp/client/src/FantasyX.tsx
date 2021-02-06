import React, { ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

import Market from './views/Market';

const queryClient = new QueryClient();
const GlobalStyles = createGlobalStyle`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Raleway', sans-serif;
        font-weight: 500;
    }

    body {
        font-family: 'Ubuntu Mono', monospace;
        font-size: 14px;
        font-weight: 400;
    }
`;

function HideOnScroll(props: { children: ReactNode }) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <div>{children}</div>
        </Slide>
    );
}

function FantasyX() {
    return (
        <>
            <CssBaseline />
            <GlobalStyles />
            <QueryClientProvider client={queryClient}>
                <HideOnScroll>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6">Fantasy X</Typography>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
                <Container>
                    <Market />
                </Container>
            </QueryClientProvider>
        </>
    );
}

export default FantasyX;
