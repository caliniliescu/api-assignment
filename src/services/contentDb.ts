import { Sequelize, DataTypes } from "sequelize";
import { DataSource } from "apollo-datasource";
import models from '../models';

export class ContentDb extends DataSource {
  private readonly sequelize: Sequelize;

  constructor() {
    super();
    this.sequelize = new Sequelize('sqlite::memory:');
  }

  async initDb() {
    models.Comment.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize: this.sequelize, modelName: 'comments' });
    models.Author.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize: this.sequelize, modelName: 'authors' });
  
    models.Author.hasMany(models.Comment, {
      sourceKey: 'id',
      foreignKey: 'authorId',
      as: 'comments'
    });
  
    models.Comment.belongsTo(models.Author, {foreignKey: 'authorId', targetKey: 'id'});
    await this.sequelize.sync();

    await this.seedDb();
  }

  private async seedDb() {
    await models.Author.create({ firstname: 'jon', lastname: 'doe', email: 'jondoe@mail.com' });
    await models.Author.create({ firstname: 'jim', lastname: 'joe', email: 'jimjoe@mail.com' });
  }
}