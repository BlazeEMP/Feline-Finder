import { Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user';
import { Breed } from './breed';

class UserBreed extends Model {};

export function UserBreedFactory(sequelize: Sequelize): typeof UserBreed {
    UserBreed.init(
        {
            //first argument: model attributes
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'id',
                },
            },
            breedName: {
                type: DataTypes.INTEGER,
                references: {
                    model: Breed,
                    key: 'breedName',
                },
            },
        },
        {
            tableName: 'user_breeds',
            sequelize,
        }
    );

    return UserBreed;
}

// Needed if getting individual user and breed relationships, in this app we want all breeds associated with user returned everytime for now so we can let sequalize create the join table automatically
// we can create a custom table later to fit needs
// TODO build association for saved breeds to individual user ids added jan 19 nancy watreas
// import { DataTypes, Model, Sequelize } from 'sequelize';
// import { User } from './user';
// import { Breed } from './breed';

// // Junction table for many-to-many relationship
// export class UserBreeds extends Model {
//     public userId!: number;
//     public breedName!: string;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }

// export function UserBreedsFactory(sequelize: Sequelize): typeof UserBreeds {
//     UserBreeds.init(
//         {
//             //first argument: model attributes
//             userId: {
//                 type: DataTypes.INTEGER,
//                 references: {
//                     model: User,
//                     key: 'id',
//                 },
//                 primaryKey: true,
//             },
//             breedName: {
//                 type: DataTypes.INTEGER,
//                 references: {
//                     model: Breed,
//                     key: 'id',
//                 },
//                 primaryKey: true,
//             },   
//          },  
//          {
//             // Second argument: model options
//             sequelize, //Pass the sequelize instance
//             tableName: 'user_breeds', //Specify the table name
//          }     
//     );

//     return UserBreeds; //Return the initialized model
// }

// simple model to allow us to post to the join table once created by sequalize

// export class UserBreeds extends Model {
//     public userId!: number;
//     public breedName!: string;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }

// export function UserBreedsFactory(sequelize: Sequelize): typeof UserBreeds {
//     UserBreeds.init(
//         {
//             //first argument: model attributes
//             userId: {
//                 type: DataTypes.INTEGER,
//                 references: {
//                     model: User,
//                     key: 'id',
//                 },
//                 primaryKey: true,
//             },
//             breedName: {
//                 type: DataTypes.INTEGER,
//                 references: {
//                     model: Breed,
//                     key: 'id',
//                 },
//                 primaryKey: true,
//             },   
//          },
//          {
//             // Second argument: model options
//             sequelize, //Pass the sequelize instance
//             tableName: 'user_breeds', //Specify the table name
//          }     
//     );

//     return UserBreeds; //Return the initialized model
// }