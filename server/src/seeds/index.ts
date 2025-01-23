import { seedUsers } from './user-seeds.js';
import { seedBreeds } from './breed-seeds.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');

        const users = await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');

        await seedBreeds();
        console.log('\n----- BREEDS SEEDED -----\n');

        // this will seed user by id for each switch statement manually adding breeds you want to be seeded using the association mixin function in User model
        for (const user of users) {
            switch (user.id) {
                case 1:
                    // there is no way to functionally add multiple breeds at once on the website, so no array method for adding has been declared, must be done by single breed onto user
                    await user.addBreed('aege');
                    await user.addBreed('abys');
                    await user.addBreed('bali');
                    break;
                case 2:
                    await user.addBreed('abys');
                    await user.addBreed('aege');
                    break;
                case 3:
                    // not seeding user 3 right now
                    break;
                default:
                    console.log('No case for user.id in seeds/index.ts:', user.id);
                    break;
            }
        }
        console.log('\n----- USER-BREEDS SEEDED -----\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// we don't need to export this, this will be run when we run the script to seed the database and call this file (see package.json)
seedAll();