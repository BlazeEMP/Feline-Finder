import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'BlazeEMP', password: '11101997' },
    { username: 'Narupo', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
  ], { individualHooks: true });
};
