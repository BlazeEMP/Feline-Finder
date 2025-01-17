import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface BreedAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
}

interface BreedCreationAttributes extends Optional<BreedAttributes, 'id'> {}

export class Breed extends Model<BreedAttributes, BreedCreationAttributes> implements BreedAttributes {
  // TODO add breed information based on desired information
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number;

  // associated User model
  public readonly assignedUser?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function BreedFactory(sequelize: Sequelize): typeof Breed {
  Breed.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'breeds',
      sequelize,
    }
  );

  return Breed;
}
