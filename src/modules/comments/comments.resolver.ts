import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { Service } from "typedi";
import { CommentModel } from "../../models/comment.model";
import { CreateCommentInput } from "./comments.input";
import { Comment } from './comments.type';

@Resolver(of => Comment)
@Service()
export class CommentsResolver {

  @Query(returns => [Comment])
  async getComments() {
    return await CommentModel.findAll();
  }

  @Mutation(returns => Comment)
  async createComment(
    @Arg('data') data: CreateCommentInput,
    @Ctx() ctx: any) {
    const newComment = await CommentModel.create(data);
    return newComment;
  }
}