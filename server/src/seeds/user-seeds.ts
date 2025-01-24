import { User } from '../models/user.js';

export const seedUsers = async () => {
    const user = await User.bulkCreate([
        { email: 'daniel@gmail.com', password: '11101997' },
        { email: 'paolo@gmail.com', password: 'pass' },
        { email: 'nancy@gmail.com', password: 'word' },
    ],{ individualHooks: true });
    // Very important to set individualHooks to true to hash the password when creating each user, otherwise hooks will not be executed
    return user;
};