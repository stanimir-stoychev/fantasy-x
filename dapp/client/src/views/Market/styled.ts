import styled from 'styled-components';
import { withStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const PlayerRow = styled.aside`
    display: flex;
    padding: 10px;

    .MarketInfo {
        background-color: rgba(0, 0, 0, 0.04);
        border-radius: 0 5px 5px 0;
        display: flex;
        flex-direction: column;
        margin: 5px 0;
        padding: 10px 20px;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 250ms ease-in;
        will-change: transform;
    }

    .MarketInfo .Stats {
        display: flex;
        margin: 0;
        overflow-x: auto;
        padding: 0;
    }

    .MarketInfo > *:last-child {
        align-items: flex-end;
        display: flex;
        flex: 1;
    }

    .MarketInfo .Price {
        align-items: center;
        display: flex;
    }

    .MarketInfo button {
        margin: 0 10px;
    }

    .Entry {
        display: flex;
        flex-direction: column;
        font-size: 18px;
        margin: 10px 0;

        &::before {
            align-items: center;
            content: attr(data-label);
            display: flex;
            font-size: 12px;
            margin-bottom: 10px;
        }
    }

    &:hover .MarketInfo {
        transform: scaleX(1);
    }
`;

const Market = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .AveragedScore {
        font-size: 30px;
        margin: 5px;
        border: 1px solid;
        border-radius: 2px;
        box-shadow: 0 2px 4px 0 rgba(62, 62, 62, 0.25);
        overflow: hidden;
        padding: 5px 10px;
    }

    .PlayerRow {
        display: flex;

        .PlayerCard {
            flex-shrink: 0;
        }
    }
`;

export { HtmlTooltip as StyledHtmlTooltip, Market as StyledMarket, PlayerRow as StyledPlayerRow };
