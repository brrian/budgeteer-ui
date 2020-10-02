import Axios, { AxiosInstance } from 'axios';
import { FetchGroupResponse, ValidateGroupResponse } from './models';

class Api {
  public client: AxiosInstance;

  constructor() {
    this.client = Axios.create({
      baseURL: '/api',
    });
  }

  public setAuthToken = (token: string): void => {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  public fetchGroup = async (): Promise<FetchGroupResponse> => {
    const { data } = await this.client.get<FetchGroupResponse>(`/groups/me`).catch(error => {
      throw new Error(`Unable to fetch group: ${error.message}`);
    });

    return data;
  };

  public validateGroup = async (group: string): Promise<ValidateGroupResponse> => {
    const { data } = await this.client
      .get<ValidateGroupResponse>(`/groups/validate/${group}`)
      .catch(error => {
        throw new Error(`Unable to validate group: ${error.message}`);
      });

    return data;
  };
}

export default new Api();
