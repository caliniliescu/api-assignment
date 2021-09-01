import { Sequelize, DataTypes } from "sequelize";
import { CommentModel } from "../models/comment.model";


const sequelize = new Sequelize('sqlite::memory:');

export async function initDb() {
  CommentModel.init({ message: DataTypes.STRING, author: DataTypes.STRING }, { sequelize, modelName: 'comment' });
  await sequelize.sync();
}