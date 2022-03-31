import { Sequelize, DataTypes, Model } from 'sequelize';
import { Media } from '@interfaces/media.interface';

export class MediaModel extends Model<Media> implements Media {
  public id: number;
  public url: string;
  public type: string;
  public scraperUrlId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof MediaModel {
  MediaModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      scraperUrlId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'scraper',
          key: 'id',
        },
      },
    },
    {
      tableName: 'media',
      sequelize,
    },
  );

  return MediaModel;
}
