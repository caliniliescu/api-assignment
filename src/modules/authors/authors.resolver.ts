import { Optional } from "sequelize/types";
import { Resolver, Query, Mutation, Ctx, Arg, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Author as AuthorModel } from "../../models/author.model";
import { Comment as CommentModel } from "../../models/comment.model";
import { DeleteInput } from "../shared/delete.input";
import { CreateAuthorInput, UpdateAuthorInput } from "./authors.input";
import { Author } from './authors.type';

@Resolver(of => Author)
@Service()
export class AuthorsResolver {
  private count = 0;
  @FieldResolver(returns => String)
  async randomCannabis(@Root() root: Author, @Ctx() context: any) {
    return await context.dataSources.randomCannabisApi.getRandomCannabis();
  }
  @Query(returns => [Author])
  async getAuthors() {
    return await AuthorModel.findAll({ include: [{ model: CommentModel, as: 'comments' }] });
  }

  @Query(returns => Author)
  async getAuthor(
    @Arg('id') id: number
  ) {
    return await AuthorModel.findByPk(id, { include: [{ model: CommentModel, as: 'comments' }] });
  }

  @Mutation(returns => Author)
  async createAuthor(
    @Arg('data') data: CreateAuthorInput,
    @Ctx() ctx: any) {
    const newAuthor = await AuthorModel.create(data as unknown as Optional<any, string>);
    return newAuthor;
  }

  @Mutation(returns => Author)
  async updateAuthor(
    @Arg('data') data: UpdateAuthorInput,
    @Ctx() ctx: any) {
    const authorToUpdate = await AuthorModel.findByPk(data.id);
    await authorToUpdate.update(data);
    return authorToUpdate;
  }

  @Mutation(returns => Boolean)
  async deleteAuthor(
    @Arg('data') data: DeleteInput,
    @Ctx() ctx: any) {
    const authorToDelete = await AuthorModel.findByPk(data.id);
    await authorToDelete.destroy();
    return true;
  }
}