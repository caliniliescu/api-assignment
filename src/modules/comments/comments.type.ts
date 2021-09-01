import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field(type => ID)
  id: number;

  @Field()
  message: string;

  @Field()
  timestamp: number;

  @Field({ nullable: true })
  author?: string;
}