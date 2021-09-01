import { DataTypes, Model } from "sequelize";
import { sequelize } from "../services/db.service";

export class CommentModel extends Model { }

CommentModel.init({ message: DataTypes.STRING, author: DataTypes.STRING }, { sequelize, modelName: 'comment' });