import u41231571 from './41231571';
import u105248644 from './105248644';
import u70388657 from './70388657';
import u76482434 from './76482434';
import u86745912 from './86745912';
import heroes from './heroes';

export default [u41231571, u105248644, u70388657, u76482434, u86745912].reduce(
    (acc, player) => ({
        ...acc,
        all: [...acc.all, player],
        map: {
            ...acc.map,
            [player.profile.account_id]: player,
        },
    }),
    { map: {}, all: [], heroes } as any,
);
