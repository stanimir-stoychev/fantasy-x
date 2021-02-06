import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import PlayerCard from 'shared/components/PlayerCard';

import { Player } from './api';
import { StyledHtmlTooltip, StyledMarket, StyledPlayerRow } from './styled';
import usePlayers from './hooks/usePlayers';

function buildPlayerStats({ stats }: Pick<Player, 'stats'>) {
    return [
        <StyledHtmlTooltip key="average-kills" title={stats.avgKills.name}>
            <Paper className="AveragedScore">{stats.avgKills.value.toFixed(2)}</Paper>
        </StyledHtmlTooltip>,
        <StyledHtmlTooltip key="average-assists" title={stats.avgAssists.name}>
            <Paper className="AveragedScore">{stats.avgAssists.value.toFixed(2)}</Paper>
        </StyledHtmlTooltip>,
        <StyledHtmlTooltip key="average-deaths" title={stats.avgDeaths.name}>
            <Paper className="AveragedScore">{stats.avgDeaths.value.toFixed(2)}</Paper>
        </StyledHtmlTooltip>,
    ];
}

function buildPlayerHeroHistory({ stats }: Pick<Player, 'stats'>) {
    return Object.keys(stats)
        .filter((statKey) => !['avgKills', 'avgAssists', 'avgDeaths'].includes(statKey))
        .map((statKey) => {
            const { avgAssists, avgDeaths, avgGameDuration, avgKills, hero, playCount } = stats[statKey].value;
            const title = <>{hero.localized_name}</>;

            return (
                <StyledHtmlTooltip key={hero.localized_name} title={title}>
                    <Avatar alt={hero.localized_name} src={hero.img} />
                </StyledHtmlTooltip>
            );
        });
}

function buildPlayerRow(player: Player) {
    const { name, avatar, price } = player;
    console.log({ player });
    return (
        <StyledPlayerRow className="PlayerRow" key={name}>
            <PlayerCard key={name} avatar={avatar} name={name} price={price} stats={buildPlayerStats(player)} />
            <div className="MarketInfo">
                <div className="Entry" data-label="Player name">
                    {name || 'unknown-name'}
                </div>
                <div className="Entry" data-label="Stats">
                    <ul className="Stats">{buildPlayerStats(player)}</ul>
                </div>
                <div className="Entry" data-label="Hero history">
                    <AvatarGroup max={5}>{buildPlayerHeroHistory(player)}</AvatarGroup>
                </div>
                <div className="Price">
                    {price} ETH
                    <Button
                        color="secondary"
                        type="button"
                        onClick={() => {
                            console.log('buy');
                        }}
                    >
                        Buy
                    </Button>
                </div>
            </div>
        </StyledPlayerRow>
    );
}

function Market() {
    const { data = [] } = usePlayers();
    return <StyledMarket>{data.map(buildPlayerRow)}</StyledMarket>;
}

export { StyledMarket };
export default Market;
