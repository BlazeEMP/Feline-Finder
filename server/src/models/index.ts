// TODO VERIFY WORKING WITH JOIN TABLE PROPERLY THEN MARK BELOW AS DONE IN NEXT LINE
// to verify if Many-to-Many relationship for saved breeds is working:
// 1. check that the user_breeds table is created in the database
// 2. confirm that the relationships work when querying (i.e. you can get the user's saved breeds)
import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { BreedFactory } from './breed.js';

const sequelize = process.env.DB_URL ? new Sequelize(process.env.DB_URL) :
    new Sequelize(
        process.env.DB_NAME || '',
        process.env.DB_USER || '',
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'postgres',
            dialectOptions: {
                decimalNumbers: true,
            },
        });

const User = UserFactory(sequelize);
const Breed = BreedFactory(sequelize);

// Many-to-Many relationship for saved breeds, 
User.belongsToMany(Breed, { through: 'UserBreed' });
Breed.belongsToMany(User, { through: 'UserBreed' });

export { sequelize, User, Breed };