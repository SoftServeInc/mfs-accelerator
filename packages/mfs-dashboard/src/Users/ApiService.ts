/**
 * TODO: This whole service should be extracted to shared utility module
 */

import axios, { AxiosInstance } from "axios";

/**
 * Little hack to bypass Axios type checking.
 * FIXME:
 */
declare module "axios" {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }
}

export interface IApiService {
  resource?: string;
  instance?: AxiosInstance;
  setResource: (resource: string) => void;
  createInstance: () => IApiService;
}

abstract class ApiService implements IApiService {
  resource?: string;
  instance?: AxiosInstance;

  setResource = (resource) => {
    this.resource = resource;
  };

  createInstance = () => {
    const instance = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: this.resource,
    });

    instance.interceptors.response.use((response) => response.data);
    this.instance = instance;
    return this;
  };
}

export default ApiService;
