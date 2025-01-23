import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type BelongsToManyAddAssociationMixin,
    type BelongsToManyRemoveAssociationMixin,
    type BelongsToManyGetAssociationsMixin,
    type Sequelize,
} from 'sequelize';
import bcrypt from 'bcrypt';
import { Breed } from './breed';

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    // this is is serialized on creation, we won't decalre a users id manually
    // BreedId will not be optional, it is a custom 4 character string from the API
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;

    declare addBreed: BelongsToManyAddAssociationMixin<Breed, Breed['id']>;
    declare removeBreed: BelongsToManyRemoveAssociationMixin<Breed, Breed['id']>;
    declare getBreeds: BelongsToManyGetAssociationsMixin<Breed>;

    // Hash the password before saving the user
    async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

export function UserFactory(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            sequelize,
            hooks: {
                beforeCreate: async (user: User) => {
                    await user.setPassword(user.password);
                },
                beforeUpdate: async (user: User) => {
                    await user.setPassword(user.password);
                },
            }
        }
    );

    return User;
}