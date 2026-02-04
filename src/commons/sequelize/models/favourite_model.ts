import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../seq_config';

export class FavouriteModel extends Model {
  declare id: number;
  declare user_id: number;
  declare product_external_id: string;
  declare active: boolean;
  declare created_at: Date;
}

FavouriteModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_external_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'favourites',
    timestamps: false,
    paranoid: true,
    deletedAt: 'deleted_at',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'product_external_id'],
      },
    ],
  },
);
