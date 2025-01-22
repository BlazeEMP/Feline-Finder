import { User } from '../models/user.js';

export const seedUsers = async () => {
    await User.bulkCreate([
        { email: 'daniel@gmail.com', password: '11101997' },
        { email: 'paolo@gmail.com', password: 'password' },
        { email: 'nancy@gmail.com', password: 'password' },
    ],{ individualHooks: true });
    // Very important to set individualHooks to true to hash the password when creating each user, otherwise hooks will not be executed
};