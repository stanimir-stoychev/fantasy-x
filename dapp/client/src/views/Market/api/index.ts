/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import RAW_DATA from '../demo/raw';

type Stats = Record<
    string,
    {
        id: string;
        name: string;
        value: any;
    }
>;

type Player = {
    avatar: string;
    name: string;
    price: number;
    stats: Stats;
};

const HEROES_MAP = RAW_DATA.heroes.reduce(
    (acc: any, hero: any) => ({
        ...acc,
        [`${hero.id}`]: hero,
    }),
    {},
);

export default {
    getPlayers: () =>
        new Promise<Player[]>((resolve) => {
            setTimeout(() => {
                resolve(
                    RAW_DATA.all.map((player: any) => ({
                        player,
                        avatar: player.profile.avatarfull,
                        name: player.profile.name,
                        price: faker.random.number({ min: 0.0001, max: 100 }),
                        stats: player.matches.reduce((stats: Stats, matchStats: any, index: number) => {
                            const shouldAverage = index === player.matches.length - 1;
                            const { kills, deaths, assists, duration } = matchStats;

                            let avgKills = (stats.avgKills || 0) + kills;
                            let avgDeaths = (stats.avgDeaths || 0) + deaths;
                            let avgAssists = (stats.avgAssists || 0) + assists;

                            const heroCode = `${matchStats.hero_id}`;
                            const { [heroCode]: hero } = HEROES_MAP;
                            let heroGameDuration = duration;
                            let heroKills = kills;
                            let heroDeaths = deaths;
                            let heroAssists = assists;
                            const heroPlayCount = (stats[heroCode]?.value.playCount ?? 0) + 1;

                            if (shouldAverage) {
                                avgKills /= player.matches.length;
                                avgDeaths /= player.matches.length;
                                avgAssists /= player.matches.length;
                            }

                            if (stats[heroCode]?.value) {
                                const { value: heroStats } = stats[heroCode];

                                heroKills = (heroKills + heroStats.avgKills) / 2;
                                heroDeaths = (heroKills + heroStats.avgDeaths) / 2;
                                heroAssists = (heroKills + heroStats.avgAssists) / 2;
                                heroGameDuration = (heroGameDuration + heroStats.avgGameDuration) / 2;
                            }

                            return {
                                ...stats,
                                avgKills: { id: 'avgKills', name: 'Average Kills', value: avgKills },
                                avgDeaths: { id: 'avgKills', name: 'Average Deaths', value: avgDeaths },
                                avgAssists: { id: 'avgKills', name: 'Average Assists', value: avgAssists },
                                [heroCode]: {
                                    id: heroCode,
                                    name: 'Player with hero',
                                    value: {
                                        hero: {
                                            ...hero,
                                            icon: `http://cdn.dota2.com${hero.icon}`,
                                            img: `http://cdn.dota2.com${hero.img}`,
                                        },
                                        playCount: heroPlayCount,
                                        avgGameDuration: heroGameDuration,
                                        avgKills: heroKills,
                                        avgDeaths: heroDeaths,
                                        avgAssists: heroAssists,
                                    },
                                },
                            };
                        }, {}),
                    })),
                );
            }, 1500);
        }),
};
