import { UserBreed } from '../models/userBreed';

export const seedUserBreeds = async () => {
    await UserBreed.bulkCreate([
        {
            userId: 1,
            breedId: 'abys',
        },
        {
            userId: 1,
            breedId: 'aege',
        },
        {
            userId: 1,
            breedId: 'bali',
        },
        {
            userId: 2,
            breedId: 'bali',
        },
        {
            userId: 2,
            breedId: 'aege',
        },
        // user 3 has no saved breeds so we can test a login and save after seeding, and empty saves rendering
    ]);
};