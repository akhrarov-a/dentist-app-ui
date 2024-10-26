import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Http service
 */
class HttpService {
  public constructor(
    baseUrl: string,
    private getHeaders: () => any = () => ({}),
    private handler?: (error: AxiosError) => any
  ) {
    this.instance = axios.create({ baseURL: baseUrl });
  }

  public readonly instance: AxiosInstance;

  /**
   * Request
   */
  public request<T>({ headers = {}, ...config }: AxiosRequestConfig) {
    return new Promise<AxiosResponse<T>>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<T> = await this.instance({
          method: 'get',
          headers: {
            ...this.getHeaders(),
            ...headers
          },
          ...config
        });

        return resolve(response);
      } catch (error: any) {
        if (!this.handler) return reject(error);

        const handled = await this.handler(error);

        if (handled) return;

        reject(error);
      }
    });
  }
}

export { HttpService };
