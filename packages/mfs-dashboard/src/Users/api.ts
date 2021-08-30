import ApiService, { IApiService } from "./ApiService";

interface IService extends IApiService {
  get: () => Promise<User[]>;
  post: (user: User) => Promise<User>;
  delete: (name: string) => Promise<string>;
}

class Service extends ApiService implements IService {
  init = (resource) => {
    this.setResource(`${resource}/users`);
    this.createInstance();
  };

  get = () => {
    return this.instance.get<User[]>("");
  };

  post = (data) => {
    return this.instance.post<User>("", data);
  };

  delete = (name) => {
    return this.instance.delete(`/${name}`);
  };
}

export default new Service();
