import { seedUsers } from './user-seeds.js';
import { seedBreeds } from './breed-seeds.js';
import { seedUserBreeds } from './userBreed-seeds.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedBreeds();
    console.log('\n----- BREEDS SEEDED -----\n');

    await seedUserBreeds();
    console.log('\n----- USER-BREEDS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// we don't need to export this, this will be run when we run the script to seed the database and call this file (see package.json)
seedAll();