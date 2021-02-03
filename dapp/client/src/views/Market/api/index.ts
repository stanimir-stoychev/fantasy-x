import faker from 'faker';
import RAW_DATA from '../demo/raw';

export default {
    getPlayers: () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    RAW_DATA.all.map((player: any): {
                        avatar: string;
                        name: string;
                        price: number;
                        stats: any[];
                    } => ({
                        avatar: player.profile.avatarfull,
                        name: player.profile.name,
                        price: faker.random.number(),
                        stats: [],
                    })),
                );
            }, 1500);
        }),
};
