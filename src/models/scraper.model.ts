import { Sequelize, DataTypes, Model } from 'sequelize';
import { Scraper } from '@interfaces/scraper.interface';

export class ScraperModel extends Model<Scraper> implements Scraper {
  public id: number;
  public url: string;
  public status: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ScraperModel {
  ScraperModel.init(
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
      status: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: 'scraper',
      sequelize,
    },
  );

  return ScraperModel;
}
