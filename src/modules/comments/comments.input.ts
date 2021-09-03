import { Field, ID, InputType } from "type-graphql";

@InputType()
class CommentInput {
  @Field()
  message: string;

  @Field({ nullable: true })
  author?: string;
}

@InputType()
export class CreateCommentInput extends CommentInput {
}

@InputType()
export class UpdateCommentInput extends CommentInput {
  @Field(type => ID)
  id: number;
}

@InputType()
export class DeleteCommentInput {
  @Field(type => ID)
  id: number;
}
