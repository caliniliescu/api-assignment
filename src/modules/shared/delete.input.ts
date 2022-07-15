import { Field, ID, InputType } from "type-graphql";

@InputType()
export class DeleteInput {
  @Field(type => ID)
  id: number;
}