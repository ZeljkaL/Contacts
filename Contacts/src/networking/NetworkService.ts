import axios, {AxiosError, AxiosResponse} from 'axios';
import {Utils} from '../resources/Utils';
import {User} from './User';

type ExtendedAxiosError = AxiosError & {config: {retryCount?: number}};

export enum APIMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export class NetworkService {
  public static instance: NetworkService = new NetworkService();

  protected baseURL = 'http://192.168.1.5:15015';
  private maxRetryCount = 3;

  protected axiosService = axios.create({
    baseURL: this.baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    this.axiosService.interceptors.response.use(
      null,
      (error: ExtendedAxiosError) => this.handleRetryOnError(error),
    );
  }

  private async handleRetryOnError(
    error: ExtendedAxiosError,
  ): Promise<AxiosResponse> {
    const config = error.config;
    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= this.maxRetryCount) {
      return Promise.reject(error);
    }

    config.retryCount += 1;
    Utils.sleep(config.retryCount * 1000);

    return this.axiosService(config);
  }

  setAccessToken(apiToken: string) {
    this.axiosService.defaults.headers.common['X-Access-Token'] = apiToken;
  }

  private async genericRequest(
    method: APIMethod,
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
  ): Promise<AxiosResponse> {
    const options = {
      method,
      url: endpoint,
      data,
    };

    if (Date.now() < User._instance.expirationTimestamp) {
      return this.axiosService.request(options);
    }

    await User._instance.updateRefreshToken();
    return this.axiosService.request(options);
  }

  async get(endpoint: string): Promise<AxiosResponse> {
    return this.genericRequest(APIMethod.Get, endpoint);
  }

  async delete(endpoint: string): Promise<AxiosResponse> {
    return this.genericRequest(APIMethod.Delete, endpoint);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(endpoint: string, data?: any): Promise<AxiosResponse> {
    return this.genericRequest(APIMethod.Post, endpoint, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put(endpoint: string, data: any): Promise<AxiosResponse> {
    return this.genericRequest(APIMethod.Put, endpoint, data);
  }
}
