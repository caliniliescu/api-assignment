import { Arg, ArgsType, Ctx, Field, ID, ObjectType, Root } from "type-graphql";
import { Comment } from "../comments/comments.type";

@ArgsType()
class RandomArg{
  @Field()
  n: string;
}

@ObjectType()
export class Author {
  @Field(type => ID)
  id: number;

  @Field()
  firstname: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  email: string;

  @Field(type => [Comment], { nullable: true })
  comments?: Comment[];
}