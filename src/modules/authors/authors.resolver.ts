import { Optional, Sequelize } from "sequelize/types";
import { Resolver, Query, Mutation, Ctx, Arg, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import models from '../../models';
import { DeleteInput } from "../shared/delete.input";
import { CreateAuthorInput, UpdateAuthorInput } from "./authors.input";
import { Author } from './authors.type';

@Resolver(of => Author)
@Service()
export class AuthorsResolver {

  // @FieldResolver(returns => String)
  // async randomCannabis(@Root() root: Author, @Ctx() context: any) {
  //   return await context.dataSources.randomCannabisApi.getRandomCannabis();
  // }

  @Query(returns => [Author])
  async getAuthors(@Ctx() context: any) {
    // const models = context.dataSources.contentDb.sequelize.models;
    // return await models.authors.findAll({ include: [{ model: models.comments, as: 'comments' }] });
    return await models.Author.findAll({ include: [{ model: models.Comment, as: 'comments' }] })
  }

  @Query(returns => Author)
  async getAuthor(
    @Arg('id') id: number,
    @Ctx() context: any
  ) {
    const models = context.dataSources.contentDb.sequelize.models;
    return await models.authors.findByPk(id, { include: [{ model: models.comment, as: 'comments' }] });
  }

  @Mutation(returns => Author)
  async createAuthor(
    @Arg('data') data: CreateAuthorInput,
    @Ctx() context: any) {
    const models = context.dataSources.contentDb.sequelize.models;
    const newAuthor = await models.authors.create(data as unknown as Optional<any, string>);
    return newAuthor;
  }

  @Mutation(returns => Author)
  async updateAuthor(
    @Arg('data') data: UpdateAuthorInput,
    @Ctx() context: any) {
    const models = context.dataSources.contentDb.sequelize.models;
    const authorToUpdate = await models.authors.findByPk(data.id);
    await authorToUpdate.update(data);
    return authorToUpdate;
  }

  @Mutation(returns => Boolean)
  async deleteAuthor(
    @Arg('data') data: DeleteInput,
    @Ctx() context: any) {
    const models = context.dataSources.contentDb.sequelize.models;
    const authorToDelete = await models.authors.findByPk(data.id);
    await authorToDelete.destroy();
    return true;
  }
}