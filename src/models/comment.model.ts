import { ForeignKey, Model, NonAttribute  } from "sequelize";
import { Author } from "./author.model";

export class Comment extends Model {
  declare id: number;
  declare message: string;
  declare authorId: ForeignKey<Author['id']>;
  declare author: NonAttribute<Author>;
 }