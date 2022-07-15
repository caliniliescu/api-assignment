import { RESTDataSource } from 'apollo-datasource-rest';

export class RandomColorApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://random-data-api.com/api/color';
  }
  async getRandomColor() {
    const data = await this.get('random_color');
    console.log(data);
    return data;
  }
}