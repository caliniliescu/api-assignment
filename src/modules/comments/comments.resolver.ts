import { Optional } from "sequelize/types";
import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { Service } from "typedi";
import { DeleteInput } from "../shared/delete.input";
import { CreateCommentInput, UpdateCommentInput } from "./comments.input";
import { Comment } from './comments.type';
import models from "../../models";

@Resolver(of => Comment)
@Service()
export class CommentsResolver {

  @Query(returns => [Comment])
  async getComments() {
    return await models.Comment.findAll({ include: models.Author });
  }

  @Query(returns => Comment)
  async getComment(
    @Arg('id') id: number
  ) {
    return await models.Comment.findByPk(id, { include: models.Author });
  }

  @Mutation(returns => Comment)
  async createComment(
    @Arg('data') data: CreateCommentInput,
    @Ctx() ctx: any) {
    const newComment = await models.Comment.create(data as unknown as Optional<any, string>, { include: models.Author });
    return newComment;
  }

  @Mutation(returns => Comment)
  async updateComment(
    @Arg('data') data: UpdateCommentInput,
    @Ctx() ctx: any) {
    const commentToUpdate = await models.Comment.findByPk(data.id, { include: models.Author });
    delete data.id;
    await commentToUpdate.update(data);
    return commentToUpdate;
  }

  @Mutation(returns => Boolean)
  async deleteComment(
    @Arg('data') data: DeleteInput,
    @Ctx() ctx: any) {
    const commentToDelete = await models.Comment.findByPk(data.id);
    const dest = await commentToDelete.destroy();
    return true;
  }
}