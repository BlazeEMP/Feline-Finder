import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { BreedFactory } from './breed.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Breed = BreedFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

// One-to-Many relationship for assigned breeds - ALTERNATE CODE TO REPLACE LINES 21-22 jan 19 nancy watreas
// User.hasMany(Breed, { foreignKey: 'assignedUserId' });
// Breed.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

// Many-to-Many relationship for saved breeds
// User.belongsToMany(Breed, { through: UserBreeds });
// Breed.belongsToMany(User, { through: UserBreeds });


export { sequelize, User, Ticket };
// export { sequelize, User, Breed };
