import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User } from './user';
import { Breed } from './breed';

interface UserBreedAttributes {
    userId: number;
    breedId: string;
}

interface UserBreedCreationAttributes extends Optional<UserBreedAttributes, 'userId'> {}

export class UserBreed extends Model<UserBreedAttributes, UserBreedCreationAttributes> implements UserBreedAttributes {
    public userId!: number;
    public breedId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function UserBreedFactory(sequelize: Sequelize): typeof UserBreed {
    UserBreed.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'id',
                },
            },
            breedId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Breed,
                    key: 'id',
                },
            },
        },
        {
            tableName: 'userBreeds',
            sequelize,
        }
    );

    return UserBreed;
}