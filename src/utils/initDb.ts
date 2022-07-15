import { Sequelize, DataTypes } from "sequelize";
import { Author } from "../models/author.model";
import { Comment } from "../models/comment.model";


const sequelize = new Sequelize('sqlite::memory:');

export async function initDb() {
  Comment.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, modelName: 'comments' });
  Author.init({
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
  }, { sequelize, modelName: 'authors' });

  Author.hasMany(Comment, {
    sourceKey: 'id',
    foreignKey: 'authorId',
    as: 'comments'
  });

  Comment.belongsTo(Author, {foreignKey: 'authorId', targetKey: 'id'});

  await sequelize.sync();
  await seedDb();
}

async function seedDb() {
  await Author.create({ firstname: 'jon', lastname: 'doe', email: 'jondoe@mail.com' });
  await Author.create({ firstname: 'jim', lastname: 'joe', email: 'jimjoe@mail.com' });
}