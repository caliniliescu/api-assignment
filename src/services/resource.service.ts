import { Field, ID, InterfaceType } from "type-graphql";
import { Service } from "typedi";

@InterfaceType()
export abstract class IResource {
  @Field(type => ID)
  readonly id: string;
}

@Service()
export class ResourceServiceFactory {
  create(apiPath: string) {
    return new ResourceService(apiPath);
  }
}

export class ResourceService<TResource extends IResource> {
  constructor(protected apiPath: string) { }

  // private async getData(model: Model<TResource>, args: any = {}, ctx: any): Promise<any> {
  //     await sequelize.sync();
  //     model.
  // }

  // public async getOne(id: string, args: any, ctx: any): Promise<TResource> {
  //     return this.getData(`${this.apiPath}/:id`, args, ctx);
  // }

  // public async getAll(args: any, ctx: any): Promise<TResource[]> {
  //     return this.getData(this.apiPath, args, ctx);
  // }



  // public async postData(ctx: any, data = {}): Promise<TResource> {
  //     const { body } = await postToAPI(this.apiPath, ctx, data);

  //     return body;
  // }

  // async patchData(ctx: any, data = {}): Promise<TResource> {
  //     const path = formatPath(`${this.apiPath}/:id`, { path: this.apiPath, ...data });
  //     const { body } = await patchToAPI(path, ctx, data);

  //     return body;
  // }

  // async deleteData(ctx: any, data = {}): Promise<any> {
  //     const path = formatPath(`${this.apiPath}/:id`, { path: this.apiPath, ...data });
  //     const { body, statusCode } = await deleteToAPI(path, ctx, data);

  //     if ([200, 204].includes(statusCode)) return { status: 'success' };

  //     return body;
  // }
}