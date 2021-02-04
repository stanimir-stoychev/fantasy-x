import faker from 'faker';
import RAW_DATA from '../demo/raw';

type Player = {
    avatar: string;
    name: string;
    price: number;
    stats: any[];
};

export default {
    getPlayers: () =>
        new Promise<Player[]>((resolve) => {
            setTimeout(() => {
                resolve(
                    RAW_DATA.all.map((player: any) => ({
                        avatar: player.profile.avatarfull,
                        name: player.profile.name,
                        price: faker.random.number(),
                        stats: [],
                    })),
                );
            }, 1500);
        }),
};
