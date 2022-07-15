import { Field, ID, InputType } from "type-graphql";



@InputType()
class CommentInput {
  @Field()
  message: string;

  @Field(type => ID, { nullable: true })
  authorId?: number;
}

@InputType()
export class CreateCommentInput extends CommentInput {
}

@InputType()
export class UpdateCommentInput extends CommentInput {
  @Field(type => ID)
  id: number;
}
