import { Field, InputType, ID } from "type-graphql";

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: true })
  firstname: string;

  @Field()
  lastname?: string;

  @Field()
  email: string;
}

@InputType()
export class UpdateAuthorInput extends CreateAuthorInput {
  @Field(type => ID)
  id: number;
}