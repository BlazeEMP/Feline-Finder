// TODO build association for saved breeds to individual user ids added jan 19 nancy watreas
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './user';
import { Breed } from './breed';

// Junction table for many-to-many relationship
export class UserBreeds extends Model {
    public userId!: number;
    public breedId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function UserBreedsFactory(sequelize: Sequelize): typeof UserBreeds {
    UserBreeds.init(
        {
            //first argument: model attributes
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'id',
                },
                primaryKey: true,
            },
            breedId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Breed,
                    key: 'id',
                },
                primaryKey: true,
            },   
         },  
         {
            // Second argument: model options
            sequelize, //Pass the sequelize instance
            tableName: 'user_breeds', //Specify the table name
         }     
    );
    
    return UserBreeds; //Return the initialized model
}
