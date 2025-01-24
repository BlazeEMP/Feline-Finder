import { DataTypes, Model, Sequelize } from 'sequelize';

interface BreedAttributes {
    id: string;
    name: string;
    imgUrl: string;
    weight: string;
    lifeSpan: string;
    origin: string;
    hairless: number;
    description: string;
    dogFriendly: number;
    childFriendly: number;
}

export class Breed extends Model<BreedAttributes> implements BreedAttributes {
    public readonly id!: string;
    public readonly name!: string;
    public readonly imgUrl!: string;
    public readonly weight!: string;
    public readonly lifeSpan!: string;
    public readonly origin!: string;
    public readonly hairless!: number;
    public readonly description!: string;
    public readonly dogFriendly!: number;
    public readonly childFriendly!: number;
    public readonly createdAt!: Date;
}

export function BreedFactory(sequelize: Sequelize): typeof Breed {
    Breed.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imgUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            weight: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lifeSpan: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            origin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hairless: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dogFriendly: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            childFriendly: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'breeds',
            sequelize,
        }
    );

    return Breed;
}