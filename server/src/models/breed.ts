// TODO VERIFY WORKING ADD A LINE UNDER THIS TO VERIFY THIS IS CORRECT ONCE FILE HAS BEEN DOUBLE CHECKED AFTER CUSTOM API DONE
// To verify code - added jan-21-njw
// to verify that the breed model mathces what is coming from the custom API
// 1. compare breed attributes in our model with the data structure from the cat API we're using
// 2. make sure all fields from the API map correctly in our model
// 3. test that breed data can be saved and retrieved correctly
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface BreedAttributes {
  breedName: string;
  imgUrl: string;
  weight: string;
  lifespan: string;
  origin: string;
  hairless: boolean;
  description: string;
  dogFriendly: number;
  childFriendly: number;
}

interface BreedCreationAttributes extends Optional<BreedAttributes, 'breedName'> {}

export class Breed extends Model<BreedAttributes, BreedCreationAttributes> implements BreedAttributes {
  public readonly breedName!: string;
  public readonly imgUrl!: string;
  public readonly weight!: string;
  public readonly lifespan!: string;
  public readonly origin!: string;
  public readonly hairless!: boolean;
  public readonly description!: string;
  public readonly dogFriendly!: number;
  public readonly childFriendly!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function BreedFactory(sequelize: Sequelize): typeof Breed {
  Breed.init(
    {
      breedName: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifespan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hairless: {
        type: DataTypes.BOOLEAN,
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
