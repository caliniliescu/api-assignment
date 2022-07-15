import { Field, ID, ObjectType } from "type-graphql";
import { Author } from "../authors/authors.type";

@ObjectType()
export class Comment {
  @Field(type => ID)
  id: number;

  @Field()
  message: string;

  @Field()
  timestamp: number;

  @Field(type => Author, { nullable: true })
  author?: Author;

  @Field(type => ID)
  authorId?: number;
}