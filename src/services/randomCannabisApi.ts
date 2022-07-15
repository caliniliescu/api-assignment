import { RESTDataSource } from 'apollo-datasource-rest';

export class RandomCannabisApi extends RESTDataSource{
  constructor() {
    super();
    this.baseURL = 'https://random-data-api.com/api/cannabis';
  }
  async getRandomCannabis() {
    const data = await this.get('random_cannabis');
    return `Today smoking strain ${data.strain}, which is of type ${data.type}`;
  }
}