import Axios, { AxiosInstance } from 'axios';
import { ValidateGroupResponse } from './models';

class Api {
  public client: AxiosInstance;

  constructor() {
    this.client = Axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  public setAuthToken = (token: string): void => {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
