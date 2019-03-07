import { RESTDataSource } from 'apollo-datasource-rest';

export class RagaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://ragaexplorer-api.herokuapp.com/';
  }

  async getAllRagas() {
    const response = await this.get('ragas');
    return response
  }

  async getRagaById(id) {
    const response = await this.get(`ragas/${id}`);
    return response;
  }
}
