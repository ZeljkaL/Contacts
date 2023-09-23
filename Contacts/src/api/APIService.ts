import axios, {AxiosError, AxiosResponse} from 'axios';

type ExtendedAxiosError = AxiosError & {config: {retryCount?: number}};

enum APIMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export class APIService {
  public static instance: APIService = new APIService();

  private baseURL = 'https://jsonplaceholder.typicode.com';
  private maxRetryCount = 3;

  private axiosService = axios.create({
    baseURL: this.baseURL,
    timeout: 10000,
  });

  constructor() {
    // Create an interceptor for retrying failed requests
    this.axiosService.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: ExtendedAxiosError) => {
        return await this.handleRetryOnError(error);
      },
    );
  }

  private async handleRetryOnError(error: ExtendedAxiosError) {
    const {config} = error;
    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= this.maxRetryCount) {
      return Promise.reject(error);
    }

    config.retryCount += 1;
    const delay = config.retryCount * 1000;

    await new Promise(resolve => setTimeout(resolve, delay));
    return this.axiosService(config);
  }

  async genericRequest(
    endpoint: string,
    method: APIMethod = APIMethod.Get,
    data: string = null,
  ): Promise<AxiosResponse> {
    const options = {
      method,
      url: endpoint,
      data,
    };

    return await this.axiosService.request(options);
  }
}
